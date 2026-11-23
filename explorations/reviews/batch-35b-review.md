<!-- The combined post-batch review of climb batch 35b, run 2 of `coordinator/CLIMB-BATCH-35.md`, the housekeeping batch of P-180: the logical equivalence of two booleans in the one library, walk's overloaded generic dotted methods with a tuple result read by element and a numeral type refused in a comprises clause, and two compiled calls that named methods their class lacked (three rungs, E, L and M, landed at `1caac80b3b` on 2026-11-23 on the curator's go of 08:4x UTC, every fork at the planner's default; run `wf_63ab85b2-667`, no judge, a green first gate), by a review worker reading only: the landed changes against P-180, P-174, P-37, P-12 and F-377, what the two paths still do differently, the forks and the run's items for the curator, gather.1's quiet wrong value, the expected-failure rule rung by rung, P-180's balance of passages and rows, the cost in three spans and by role against the estimate, re-measuring, three events, the practice's measures, the misses, the skill writer's list, the record's sentences made false, the routing, the list for the batch after, and a section for the curator that shows each rung on a small program. -->
<!-- Base `5a595515546edc5564515d4492ff4d44b5d07153`, whose code is run 1's landing `0a83a70498`; base build `/home/user/fortress-base43` at `0a83a70498`; launched 17:50:01 UTC (the coordinator's Workflow call); landed on `main` as E `e5cf04d474`, L `5c31f2b68a`, M `08860c527f`, the closes `798cab4dfb`, the gather's record `f23f91938d`, the review's corrections `b309f9110f` and the gate's tables `1caac80b3b` (20:59:32), pushed by the commit stage in one atomic push at 20:59:49 with no hold; 11 agent transcripts, 11 starts and 11 results in the journal. Read against `main` at `87180e9863`, whose one commit after `1caac80b3b` is the coordinator's boot note. Sources for the decisions: P-180 with its history, P-174 with its history of 2026-11-23, P-165, P-37, P-12, F-26, F-253, F-377, F-403 to F-406; review-queue head (his choice of 11:2x UTC on 2026-11-23) and items 503, 562, 576, 585, 616; `PLAN.md:798-810`. The gate's results are cited as its agent returned them and were not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch35b/rev35b/ (copied from run 1's review: tx.py, calls_mod.py, brief2.py, parts35.py, ef35.py, before35.py, runs3.py, usertext.py, taskrem.py, attach.py, firstmsg.py, skill.py, upto.py, spans31.py as spans35b.py; new: gaps.py, coordw.py). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, `date`, `uptime`, grep, sed, git and the journal reads, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 35b, run 2: three of three rungs, seven rows closed and ten opened; a green first gate, the count and the distance 0; one loud failure turned into a quiet wrong value for one shape (row 1125); a run of 3.94M, 9 % over its estimate with the reserve, rung M's 1.27M the overrun; every worker stated its expected failure in the call that first ran its test

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `1caac80b3b`. Java paths are under `ProjectFortress/src/com/sun/fortress/`. The three rungs share no file, so the gather applied them in the manifest's order, E, L, M, and every hunk applied cleanly (`compile-ladder/climb-batch-35b/RECORD.md`, "Conflicts"). Only L's citations of `Specification/appendices/changes.tex` moved, by the gather's own corrections; the gather re-anchored them (`RECORD.md`, "The lines that another rung's hunks moved").

**E, the logical equivalence of two booleans in the one library (row 184 rewritten and closed; rows 1118 to 1121 opened; F-403, F-404). Two lines in each of the one library's two files; fork E1 as the plan says.**
- The fix: `opr EQV(a: Boolean, b:Boolean):Boolean` and `opr NEQV(...)` beside `opr <->` (`Library/FortressLibrary.fsi:2793-2794`); bodies `if a then b else NOT b end`, the form of `XOR`, and `NOT (a EQV b)`, the specification's definition (`Library/FortressLibrary.fss:4923-4924`; `Specification/basic-lib/Fortress.NegatedOperators.tex:34-35`). The planner's hack wrote `a=b`; the worker chose a body that calls no `=`, since `=` of two booleans dies compiled under the one library (row 994; E's `REPORT.md`, "Decisions", 2).
- Decisions: P-37 held: `git diff 5a59551554 1caac80b3b -- ProjectFortress/LibraryBuiltin Library/CompilerLibrary.fs?` prints nothing. Fork E1's form, the library's own for the boolean operators (`FortressLibrary.fsi:2784-2792`), where the specification and the prelude write methods of `Boolean` (`Specification/basic-lib/booleans.tex:252-263`; `CompilerBuiltin.fsi:465-466`).
- The paths: walk and the compiled path under the one library now answer `t ≡ f` and `t ≢ f`; the compiled path under the prelude already did. On two objects of a program's type both refuse: walk at the call, 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt', compiled statically, 'Could not check call to operator EQV' (E's `SKEPTIC.md`, "My programs"). Walk's `a ≢ b` on two objects moved from a refusal before the run to that dispatch error at the call; still loud.
- The stages on E's code: count `#total 0`, distance 'DISTANCE SAME   0'; `ant testOneLibrary` 41 tests, 0 failures (`RECORD.md`, "Rung E").

**L, three of walk's departures (rows 1057, 1058 and 981 closed; row 744 narrowed; rows 1122 to 1126 opened; F-405, F-257, F-341 and F-375). Four walk files and two clauses of the specification; forks L1, L2 and L3, L1 wider than its words.**
- Row 1057: an object now takes each generic method held in its members' unfinished overloaded set, as its instance at symbolic static arguments (`interpreter/evaluator/values/Constructor.java:839`, `:887`), keyed by `genericKey`, the name and the kinds of the static parameters (`:896-906`, the kinds the skeptic's fix `529e8955ba`). A call that writes static arguments instantiates each generic overload whose static parameters take them and lets the call's arguments choose (`values/DottedMethodApplication.java:155-158`, `genericOverloadsAt` from `:181`). Fork L1 said "chooses among the overloads that fit the call's number of arguments"; the worker found that no overload reached that site, repaired where the name was lost, and so fixed every form of one name, also one number of parameters (`GenericMethodOverloadSetWalk`; L's `REPORT.md`, "Decisions", 1). The choice by number of arguments is the dispatch among the instances. The compiled path already ran these.
- Beyond the section's members: the skeptic's `6fcbe62f95` makes `OverloadedFunction.compatible` refuse a type at a `nat` or `int` parameter (`values/OverloadedFunction.java:3065-3066`). It reaches the top-level generic function too: `kd[\ZZ32\](1, 2)` beside `kd[\nat n\](x: ZZ32)` now runs under walk, as compiled, where the base stopped (`GenericOverloadStaticArgKindsWalk`). Settled by `Specification/basic/overloading.tex:149-151`.
- Row 1058: `returnRuleAtObjectArguments` reads a tuple result element by element through `belowAtObjectArguments` (`values/OverloadedFunction.java:884`, `belowAtObjectArguments` from `:911`), as tuple types are covariant. The same restriction stays at the sibling site `returnRuleAtEveryInstance` (`:1288`), two generic declarations: row 1122.
- Row 981: walk's load check refuses a numeral type in a `comprises` clause, with the `extends` clause's message (`interpreter/evaluator/BuildEnvironments.java:1228-1234`). P-174: "is written only as a coercion's or an operator's parameter type". Held. The three other written forms stay loaded under walk (row 1124), as fork L3 says.
- The residue that matters: gather.1, row 1125 (section 3).
- Appendix I: the clause on row 981 is gone from the numeral entry (`changes.tex:5494-5496`); row 744's clause narrowed (`:2421-2423`); the gather named rows 1125 and 1126 in the inference callout and entry (`Specification/basic/inference.tex:345-350`, `changes.tex:2424-2429`) and row 1122 in the overloading entry (`:3128-3131`). Rows 1123 and 1124 are named in no effect (review.1).
- Walk's suite: 888 tests on the worker's code and 892 on the skeptic's, 0 failures; no line of the library or of a team test refused at load (`RECORD.md`, "Rung L").

**M, two compiled calls that named methods their class lacked (rows 1053 and 815 closed, and row 390 beyond the section; rows 770 and 1112 rewritten; row 1127 opened; F-406, F-377). `CodeGen.java` only; forks M1 and M2, M2 with a device that its words did not foresee.**
- Row 1053: a call that the desugarer made from an assignment to a field, with no arrow from the checker, now takes as its domain the parameter type of the receiver's one setter-shaped method at the receiver's instance (`compiler/codegen/CodeGen.java:7521-7526`, `setterParamType` from `:7737`); the skeptic's `35116d1ffb` reads a type variable's bounds the same way. The value goes through `evalArg`, whose one-argument branch casts a value of self's type below its trait (F-377). Fork M1 word for word.
- Row 815: `for_RewriteFnOverloadDecl` now splits the set with its subsets, `os.split(true)`, as the two other sites do (`:8723`, beside `:7457` and `:8817`), so the overload method that a call names is written (`:8725`). Since the team's `2fb7488717` of 2012-05-09, `split(false)` left no principal member and nothing was written, in any component (M's `SKEPTIC.md`, check 4). Where the call's arrow is not the principal member's, `forwardToPrincipal` writes a method at the call's own signature that passes its arguments on (`:8749-8771`). That forwarder is the worker's device: fork M2 named "the overload method written or the call made through the trait". Its behaviour is M2's: `num(R)` runs `R`'s declaration, and `width(self)` in a trait `Solid` that comprises `Brick` runs `Brick`'s.
- Row 390 beyond the section: `p(NarrowOf(1))` beside `p(x: Wide)` and `p(x: Any)` named the same never-written method, so it runs now; its `XXX` test turned red and was promoted, `CoercionAnyOverloadRungC` (`48f169bd40` on the branch).
- The one library: its `FortressLibrary` class gains four methods, `\=numerator{...}(QQ)`, `\=denominator{...}(QQ)` and their two forwarders at `(Ratio)`; `Ratio`'s calls of them now name `(Ratio)` where the base named `(QQ)`, the tie's order of row 935 (M's `REPORT.md`, section 5). `ant testOneLibrary` 40 of 40 on the worker's and on the skeptic's code.
- Decisions: none names the mechanism; the specification's dispatch (`Specification/basic/overloading.tex:302-311`) and assignment (`bindings.tex:60-61`, `:86-87`), which walk already followed. Held.

**What the two paths still do differently after this run.** Each is a row; run 1's list stands as its review gives it.
- Two generic dotted methods of one name, number of parameters and kinds that differ only in their bounds: walk keeps the first met and answers 2 where the text answers 3 (row 1125); compiled, the code generator stops, 'duplicate entry' (row 537).
- Two generic declarations, one inside the other, with tuple results that hold each its own type parameter: walk refuses the valid pair at load (row 1122); compiled, 'duplicate entry' (row 537).
- Two generic functional methods of one name and number of parameters, excluding at a plain parameter: walk never chooses the second (row 1123); compiled, 'ClassCastException ... FunctionalMethod cannot be cast to ... Method' (row 724).
- A call on a receiver assumed at a trait of the trait's two generic methods: walk 'Missing type U' (row 1126); compiled, refused (`compiler.md`, "a generic method on an assumed receiver").
- A dotted call that writes static arguments to a name overloaded by a plain and a generic method: walk stops (row 744); compiled runs the plain overload.
- A numeral type written as a return type, a variable's or a field's type: walk loads it; the checker refuses it (row 1124).
- An equivalence operator that nothing declares, as `x APPROX y` in a chain: walk loads it and stops at the call with an `InterpreterBug`; compiled refuses it statically (row 1118).
- `⊕`, `⊼` and `⊽` of two booleans: compiled under the prelude runs them; walk and the one library refuse them (row 1121). `Pt(1) ≢ Pt(2)`: compiled under the prelude prints `true`; walk refuses it (row 1119). Both go with the prelude at the switch-over (P-37).
- A comprised object's functional method at a return type narrower than the trait's: walk runs it; the checker refuses it (row 1127).
- Now the same, where the base differed: `t ≡ f` and `t ≢ f`; a set of generic dotted methods of one name, of one or two numbers of parameters; a generic call at written static arguments where a `nat` overload sits beside; a tuple result in the Return Type Rule at object arguments; a numeral type in a `comprises` clause, refused; `c.t := High` and `x.h := High`; `num(R)` and `width(self)`; row 390's call.

### 2. The decisions that landed at a default

The record's section 3 gives run 2's forks E1, L1, L2, L3, M1 and M2, none consequential by the planner's reading. The run's result holds sixteen ids for the curator in ten entries of `PLAN.md:801-810`, "Climb batch 35b, listed for his review": E.worker.1, E.worker.2, E.skeptic.1 to E.skeptic.4, E.reserved.1, L.worker.1 to L.worker.3, L.skeptic.1 to L.skeptic.3, gather.1 and review.1. "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions"). Until his yes to the process review's B1, the routing stands as written: the queue's head (his choice of 11:2x UTC on 2026-11-23) takes only consequential items into the queue, and a routine default lands and is recorded in FACTS or a ledger row; PLAN's group lists the batch's items for his review. Each line below ends with its route.

**Forks E1, L2, L3 and M1: as the plan says, not consequential.** Each builds the specification's answer, or P-174's, that the other path already gave, changes no decision, touches no line of microGPT, and can be undone. E1 picks the library's form for the boolean operators over the method form of the specification and the prelude; the two forms give the same answer on every program, since a functional method of `Boolean` is overloaded with the top-level functions (`Specification/basic/traits.tex:616-626`) and no program can extend the value object `Boolean`. Each informs him.

**Fork L1: wider than its words, not consequential.** The worker repaired where the name was lost, not where the plan's words put the choice, and so fixed one number of parameters too; the skeptic's two fixes followed, one at a shared member that also reaches the top-level generic function. Each follows `overloading.tex:149-151` and `:235-238`. Its residue, row 1125, is section 3. It informs him.

**Fork M2: as the plan says, with the forwarder; not consequential.** The overload method is written, M2's first way; the forwarder at the call's arrow covers the checker's tie order (row 935), which names `(R)` in one compile and `(Q)` in another. Row 390 closed with it. It informs him.

**The items for him, one line each.**
- E.reserved.1 (`PLAN.md:806`): in a program over the APL experiments' `AplCore`, `t ≡ f` and `t ≢ f` now print `false` and `true`, where the base stopped; AplCore's own values unchanged; no gated program and no microGPT line imports it. Not consequential. A default that informs him.
- E.worker.1 and E.skeptic.4's first half (`:801`), a one-library run test of `EQV`: a test choice for the next brief, the coordinator's, as run 1's judge-gate.2 was. Owed: off his list.
- E.worker.2 and E.skeptic.4's second half (`:802`), `seed-worktree.sh` leaves out `build-one`: a coordinator tool, the coordinator's to fix between batches (`references/batch.md`, "The workflow"); F-404 records it. Owed: off his list, and a process finding (Part 2, 3).
- E.skeptic.1 (`:803`), `⊕`, `⊼`, `⊽` and `majority` in the one library: P-180 settles it ("a batch fixes the defects that make walk and the compiled path behave differently or depart from the specification"), and P-37 lets the one library take the prelude's design where it is the team's later word; E1 sets the form. A default that informs him; row 1121 to the batch after.
- E.skeptic.2 (`:804`, row 1120, `CONTESTED`), which ASCII names of `≢`, `⊄` and `⊈` the parser reads: the overview and the operators appendix disagree, no decision says which, and nothing landed. A question that waits for him, unless the coordinator finds the team's later word (P-26) settles which passage holds; then a repair.
- E.skeptic.3 (`:805`), the typeset `NOR` entry describes `OR`: the entry's own "(not or)" and the trait's property settle it. A default that informs him; a revision for the next batch that edits `booleans.tex`.
- L.worker.1 and L.skeptic.1 (`:807`, row 744), a call at written static arguments to a plain and a generic method of one name: nothing landed, the call stops as on the base. By my reading `overloading.tex:149-151` substitutes written static arguments only "for the static parameters of the declarations that they instantiate", which a plain declaration has none of, so the text takes the generic instance and the compiled path departs. If the coordinator reads it so, it is a repair under P-180, not his question; otherwise a question that waits for him.
- L.worker.2, L.worker.3, L.skeptic.2 and L.skeptic.3 (`:808`), row 1124 and P-174's sentence on row 981: the row is the ledger's form, and P-174's sentence is the record-landing's to bring in line, which the coordinator names to him with its old and new words. A default that informs him.
- gather.1 (`:809`), row 1125: section 3. A default that informs him; the row first in the batch after's list.
- review.1 (`:810`), rows 1123 and 1124 and the `comprises` clause in no Appendix I effect: the skill's rule settles it (`references/specification.md:22`). A default that informs him; the clauses go with the next batch that edits either entry.

None of these is consequential by the rule: none reverses or bends a decision of his, none touches microGPT's lines or speed, each can be undone, and where the record is silent nothing landed (E.skeptic.2, L.worker.1).

### 3. gather.1: a loud failure turned into a quiet wrong value

**What it is.** Two generic dotted methods of one name, one number of parameters and static parameters of the same kinds, which differ only in their bounds:

    object Nested
        tk[\U extends Number\](y: U): ZZ32 = 2
        tk[\U extends ZZ32\](y: U): ZZ32 = 3
    end

`Nested.tk(n)` for `n: ZZ32` must run the more specific declaration and answer 3. On the base walk stopped, 'Cannot find definition for method tk given receiver Two'. After rung L the two share one symbolic instantiation, keyed by name and kinds (`Constructor.java:896-906`), their instances get one signature, and `putIfAbsent` keeps the first met (`:850`, `:858`): walk answers 2. The same two as top-level functions answer 3 and 2, on the base and now (L's `SKEPTIC.md`, finding 3, `SkBoundsNested` and `SkBoundsNestedTop`). With `String` for `ZZ32`, a call over a `String` stops, 'Meet(String, Number) not a singleton'.

**Is it a row?** Yes: row 1125, `NEGATIVE-VERIFIED`, with the expected failure `tests/XXXGenericMethodBoundsDifferWalk.fss`, which asserts 3; and F-405 names it. The skeptic did not repair it: a key that reads bounds must read them modulo the static parameters' names, since the one library redeclares `Generator`'s `map[\G\]` in `Indexed` as `map[\R\]` (`Library/FortressLibrary.fss:1374`, `:2269`), "more than a repair round".

**Is it a regression against the base?** Not of a value: no program that ran on the base gives another value now, since on the base every call of such a pair stopped. It is a regression of the failure's kind: a loud stop became a quiet wrong answer, the outcome that the skeptic's failure-mode check exists to catch. Two neighbours of the same change stay loud: row 1123's second call ('Failed to find any matching overload') and row 1126 ('Missing type U'). By P-180, "A ledger row records a defect until its fix lands; it is no place to leave one", and by run 1's process finding 7, a defect that the batch's own change made goes first in the next list. So row 1125 heads the batch after's additions (Part 5).

### 4. The expected-failure rule, rung by rung

The form: `tests-writing.md`, "The order", step 2. Read by call from the transcripts (`ef35.py`, `before35.py`; the call ids are the last six characters of each tool call's id).

**Every worker echoed its `Expected failure:` line in the call that first ran its test, before any edit of code; two of three runs failed as stated, and the third failed another way, whose cause the worker found and stated before its fix.**
- E: call `gvXKWt` (18:33:02), the walk test, echoed '... at its first EQV with an InterpreterBug ...' and failed another way: 'Operator NEQV is not defined.', 'Tests run: 1,  Failures: 1'. The worker found why (`≢` is no chaining operator, so the disambiguator refuses it before the run), echoed the corrected line in `XYxUgF` (18:34:27) and saw it fail so. The compiled test in `XCFNGP` (18:34:43): 'Operator EQV is not defined.', 'Operator NEQV is not defined.', 'Tests run: 15,  Failures: 1', where the line said 2 tests: the fourteen compiles count, the failure is the one stated. First edit of the library 18:38:19 (`QAar9n` at 18:38:21). The probe `EqvOnlyProbe` ran after the first harness run, to find the cause.
- L: `chGaCi` (17:51:36), two lines, 'Cannot find definition for method tk given receiver Two', 'REACHED: a numeral type is in a comprises clause', ' Missing expected refusal at load', 'Tests run: 2,  Failures: 2'; `uzjvke` (17:51:49), 'fails the Return Type Rule', 'Tests run: 1,  Failures: 1'. First edit 17:55:08 (`hE62NP`, a debug print).
- M: `AQyVCm` (17:52:23), one line for three tests and two link tests, 'Tests run: 9,  Failures: 3', the three `NoSuchMethodError` lines as stated. First edit of `CodeGen.java` 18:02:03 (`VHXShk`). Row 390's promoted test, written after the fix, failed on the old code through `old-fortress.sh` (`vN717Q`, 19:02:06) after its line, as step 2 allows.

**The skeptics.** Each `SKEPTIC.md` check 2 names the worker's calls and times, and each matches the transcript (E `:12`, L `:12`, M `:8`). Each skeptic with a test of its own echoed its line before the test's first run: E's (`XXXBooleanOplusNandNorMajorityWalk`, green as an expected failure, then red with the four declarations written in for one run); L's (19:18:55, three lines on the worker's head; one run failed in the other order of the same cause, which the skeptic named and echoed again before the rerun); M's (19:49:59, 'NoSuchMethodError: ... $HCell.h(...$High)', 'Tests run: 3,  Failures: 1', as stated). No report claims a statement that its transcript does not hold.

**Each "Skeptic's trim:" commit.** None in this run: the twelve skeptic commits are three fixes ("Skeptic's fix:" `529e8955ba`, `6fcbe62f95`, `35116d1ffb`) and nine corrections or records.

**Against run 1,** where five of five workers stated the line: the form holds in its third batch, and E's mismatch shows it doing its work: the wrong expectation was caught before the fix.

### 5. P-180 in this batch

**The passages made needless.** The record's list for run 2 (`CLIMB-BATCH-35.md`, "For the skill writer", after run 2) names six, each on `main` as quoted, each made needless by the landing:
- `references/revival-changes.md:57`, "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." (E): rewritten, the one library declares `≡` and `≢` over two booleans.
- `references/interpreter.md:82`, two generic dotted methods of two numbers of parameters, "Give the two methods two names." (row 1057, L): goes.
- `references/interpreter.md:80`, the valid pair with a tuple result (row 1058, L): goes.
- `references/interpreter.md:29`, a numeral type in a `comprises` clause loads and runs (row 981, L): goes.
- `references/compiler.md:174`, an assignment to a `var` field, "Bind the value at the field's type first" (row 1053, M): goes.
- `references/compiler.md:172`, a comprised object's functional method, "Call it through a value typed as the trait" (row 815, M): goes; the lead-in at `:171` stays for row 839, in M's skeptic's text (`RECORD.md`, "Left for the coordinator and the skill writer").

**Each closed row, path by path.**
- 184: both paths now, walk by its test, the compiled path under the one library by `OneLibraryBooleanEquivalence`, a compile test in the gate's onelibrary track; the prelude ran it already.
- 1057: walk now as compiled. Its wider forms too; the bounds form departs (row 1125).
- 1058: walk now as compiled; the two-generic form departs on both (row 1122, row 537).
- 981: walk now refuses as the checker does; the other three written forms still load under walk (row 1124).
- 1053, 815 and 390: compiled now as walk.

**The rows opened against the rows closed.** Seven closed, 184, 1057, 1058, 981, 1053, 815 and 390, one beyond the plan's six. Ten opened, 1118 to 1127:
- one whose failure the batch turned quiet, row 1125;
- four remaining forms of the closed rows that walk already had: 1122 (1058's sibling site), 1123 and 1126 (1057's functional and assumed-receiver forms), 1124 (981's other forms, which review-queue item 503 already named);
- five older defects that the probes found beside the work: 1118, 1119, 1120 (`CONTESTED`), 1121, 1127.
- Two are a line or two by reading: 1122 is the same `if (rOut != p) return false` at `OverloadedFunction.java:1288`, and 1121 is three declarations beside E's two.
- None reached the skill: since `403a0e60cb` the record-landing names a new trap to the coordinator and adds no sentence.

So the balance is 7 closed against 10 opened. Over both runs of the batch: 15 closed against 18 opened, with row 1100's fix landed and its row open. The process review recommends reporting this balance at each landing and gating nothing on it (`reviews/process-dead-ends-2026-11-23.md`, A1); this is its second figure. Of the 18, 12 are older defects or remaining forms that the batch's probes found, so the balance measures finding as much as fixing.

### 6. The gate, the count, the distance and microGPT

**The gate, green at its first run,** on `f23f91938d`'s code (20:35 to 20:58): 0 failures in 3,698 tests in 64 suites (run 1's 3,682). `CompilerJUTest` 1,806 to 1,810, `OneLibraryJUTest` 40 to 41, the system shards 886 to 897, `OtherCompilerJUTest` 263, `LibraryJUTest` 86, `SpecDataJUTest` 130. 24 atomic programs, 72 of 72 `PASS`. The ladder with no move, all 85 programs at pass, `ladder.tsv` identical to run 1's. The count 'COUNT SAME   0', `#crash none`, the shadow matching; the distance 'DISTANCE SAME   0', every kind 0. `gate_compare` printed nothing. The review's commit `b309f9110f` landed while the gate ran and touched only `PLAN.md`. microGPT's walk check at the commit stage: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for both programs (39 s and 32 s).

**The comparisons.** Nothing hidden goes to the list. No line of the team's tests was rewritten.

**The stages' seconds.** The count stage about 69 s by the log's file times, the distance stage 130 s (`FortressLibrary` 85 s), both on the 2.30 GHz Xeon of run 1, so they compare with its 73 s and 127 s. F-240 now says so, against run 1's figures on the same CPU (the commit stage's summary).

### 7. The cost, by role, against the record, and in three spans

**The run wrote 3.94M over 11 transcripts, in 3 h 10 min** (17:50:01 to 21:00:25; `batch-measures.py` gives the same 3.94M). Every agent ran on Opus. The result's `totalTokens`, 3.75M, counts otherwise.

By role (writes, then share):
- Rung workers (3): 1.70M, 43.2 %. M 903K, L 476K, E 320K.
- Skeptics (3): 1.10M, 27.9 %. L 431K, M 369K, E 298K.
- Gather 425K, 10.8 %. Merged-diff review 393K, 10.0 %. Gate 139K, 3.5 %. Commit 117K, 3.0 %. Disk 64K, 1.6 %.

**Against the record:** "Run 2: about 3.0 million, 3.6 million with the reserve. The range is 2.6 to 4.2 million. About 3 hours and 15 minutes, 4 hours with the reserve." (`CLIMB-BATCH-35.md`, section 2, "Cost and time"). **3.94M: 31 % over the estimate, 9 % over it with the reserve, inside the range; 3 h 10 min to the commit stage's last record.** By role:
- **E: 0.62M against 0.5 (+24 %).**
- **L: 0.91M against 0.7 (+30 %).**
- **M: 1.27M against 0.75 (+70 %).** Its worker alone, 903K, wrote more than the rung's price.
- **The three rungs: 2.80M against 1.95 (+43 %).**
- **The fixed roles: 1.14M against 1.1 (+4 %):** gather 425K against 0.4, review 393K against 0.35, gate 139K against 0.15, commit 117K against 0.13, disk 64K against 0.065.
- **The reserve: 0 of 0.6.** No judge, no repair round, no second gate.
- **The minutes.** The rung stage 2 h 10 (17:50 to 19:59), two agents at a time, the workers in the order L, M, E; workers 38, 82 and 35 minutes, skeptics 31, 27 and 20; the gather 36; the review 15 beside the gate's 22; the commit stage 2.

**Where the estimate and the run differ: rung M.** Its last edit of code was at 18:13:20; from 18:19 to 19:02 its worker compared the compiled prelude and the one library, old code against new, class by class (M's `REPORT.md`, section 5), and wrote 489K doing it (`upto.py`: 347K before 18:19, 836K by 19:02). Of that, 398K was one cache refill: call 217 at 18:36:33 ran a `javap` comparison of 3,217 class files in the foreground until the Bash tool's 600 s limit moved it to the background, and the next call came 648 s later, after the prompt cache had lapsed (`gaps.py`). `references/session.md:19`: "In an agent, keep every wait under 240 s." The comparison found the four new methods and that no setter's call changed; the section asked for neither. Without the refill M is 0.87M, 16 % over its price, and the run 3.54M, inside the estimate with the reserve. E and L ran over by their skeptics' fixes and new rows: L's skeptic wrote 431K for two fixes, two rows and a whole suite.

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed. The folders: the session's Agent-tool workers, the workflows' folders but this run's, the project's folder of headless runs, `-home-user-fortress-landing-35`, and the scratchpad folders of headless runs.
- **Span 1, run 1's landing work,** from its commit stage's last commit `0a83a70498` (14:31:42) to the coordinator's revival-page step after the record-landing workflow `wf_ec454fa0-c7d` (journal last written 17:24:07): `c989641990` at 17:25:40, with the quiz key `e03ad90feb` at 17:25:41; the boundary is 17:25:41. `spend.py` printed 6.68M from 1795444302 and 0.90M from 1795454741: **5.78M over 32 transcripts, and the coordinating session's own 100K over 64 messages.**
  - The record-landing workflow, 26 agents (nine on Sonnet), with its four headless writers: 4.46M over 30 (15:02 to 17:24). By part: the record 1.99M (sort, write, check, cold read, fix, judge, two headless record writers, and the land step twice, 75K then 27K: it stopped, the coordinator cleared the queue check in `49a9f1fcb1` at 16:09, and it resumed; 15:02 to 16:10); the orientation update 1.58M (admission, write, a headless writer, preserve, cold read, a quiz author, two readers and two graders, a fix, a re-read and a judge; 16:10 to 16:55); the skill step 0.31M (16:55 to 17:04); the page of `fortress-repo` changes 0.44M (17:04 to 17:23); the push and the revival page 0.13M.
  - In the span, outside the workflow: run 1's post-batch review 1.18M (14:34 to 15:02); run 1's commit agent 139K, whose transcript last changed at 14:32:43.
  - Against the batch before: climb batch 34b's landing span wrote 3.73M, its workflow 2.96M over 17 (`reviews/batch-35-review.md`, section 7). This one is 55 % more, the orientation update with its two quiz rounds 1.58M against 34b's admission of 0.20M.
- **Span 2, the preparation,** from 17:25:41 to the launch, 17:50:01. `spend.py` printed 0.90M from 1795454741 and 0.31M from 1795456201, the 0.31M this review's own transcript: **0.59M over 3 transcripts, and the coordinating session's own 28K over 25 messages: 0.62M.**
  - The batch's preparation, 0.41M: the base build 43, 96K (17:26 to 17:29); the re-read of run 2's sections on the landed tree, 319K (17:30 to 17:48); the splice, the coordinator's own commit `5a59551554`, with no agent.
  - The triage's drafts applied, 179K (17:26 to 17:38), the queue triage's work, not the batch's.
  - Against run 1's preparation of 1.81M: run 2 reused run 1's plan and probes, so its own preparation was a re-read and a base build.
- **Span 3, the run,** 17:50:01 to 20:59:33, over the run's folder: `spend.py` printed 3.94M from 1795456201 and 0.12M from 1795467573. **3.82M over 10 transcripts.** The commit agent, 117K, last changed at 21:00:25 and counts after the span. The coordinating session wrote 12K during the run, over 15 messages.

So run 1's landing work cost 5.78M in its span, its record-landing 4.46M; run 2's preparation 0.62M; and the run 3.82M. The landing work of the batch before is now larger than the run it prepares.

**The briefing's use.**
- **6 of 6 briefed launches read their briefing, 100 %, and each read it to its last part. None read it in its first turn.** The briefed launches are the three workers and the three skeptics; the disk check, the gather, the review, the gate and the commit stage have none by design.
- When, by call and seconds after the start: skeptic M at call 6, 16 s; skeptic E at 7, 20 s; skeptic L at 7, 37 s; rung M at 17, 40 s (two parts, the second at 43 s); rung L at 17, 47 s; rung E at 17, 50 s.
- Its results came to about 55K tokens, 1.4 % of writes (`brief2.py`).

**Other measures** (`batch-measures.py`).
- First calls: 634K (16.1 %), 7 cold. Cache refills: 1, 398K, rung M. Refusal cycles: 0. Rulings and repairs on the merged tree: 0.
- Builds per worker: L 5, one for a debug print, one to restore, one after each of its three fixes; M 2 with two library orders; E 0, its `ant testOneLibrary` built the one library. M's skeptic 1 with a library order, L's skeptic 1, the gather 1, the gate 1.
- The skill's load, by a rough count: about 0.59M, 15 %. `revival-changes.md` was read by 9 of the 11 launches, all but the disk check and the commit stage.
- Error results: 13.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `aa570b50`, 64K, 0.1 min; rung L `a2a84f31`, 476K, 38.3; rung M `a761f806`, 903K, 82.3; rung E `a95dc2e8`, 320K, 34.9; skeptic L `a8519532`, 431K, 31.3; skeptic E `a818aba7`, 298K, 20.4; skeptic M `a098454d`, 369K, 26.7; gather `abbb16ad`, 425K, 35.9; gate `ae77d1fa`, 139K, 22.5; review `a4407747`, 393K, 15.5; commit `aed7775f`, 117K, 2.3.

### 8. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **No agent ran a whole suite twice on one code state.** L ran `testSystem` once on its final code, and its skeptic once on the code of its fixes. E ran `ant testOneLibrary` once; M once on its final code, after stopping one start whose build was stale, and its skeptic once on the code of its fix. The gate ran every step once on the merged code.
- **The count and the distance stages:** E once each on its final code; the gate once each.
- **The specification was built once,** by the gather on L's text; the commit stage copied that PDF.
- **The batch's own tests ran at the gather** on the merged code (walk 'OK (14 tests)', compiled 'OK (82 tests)', the 52 demos), then in the gate's tracks: the manual's check before the gate. **The microGPT quick pair ran once,** at the commit stage.
- **One measurement nobody asked for:** M's class-by-class comparison of the compiled libraries (section 7).

### 9. Three events

**No agent ran twice.** The journal holds one `launched` line, 11 `started` lines and 11 `result` lines, each label once. No process stop, VM restart or usage limit fell in the run: the machine's last start is 08:32:22 UTC (`uptime -s`).

**No commit other than the batch's fell between the gather's start and the batch's push.** The gather's first record is at 19:59:45 and its first commit, E's `e5cf04d474`, at 20:05:21; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `7a96acc25e`, the coordinator's boot note of 17:50:32 (`RECORD.md:7`). `main`'s reflog from then to the push holds only the batch's seven commits, with no amend. `origin/main` moved from `7a96acc25e` to `1caac80b3b` by the commit stage's one atomic push at 20:59:49; the coordinator's next commit is the boot note `87180e9863` at 21:01:24.

**No agent received text from outside its brief.**
- The curator sent the coordinating session no message during the run; its only user records then were four check-in notices and the run's completion notice. No marker '<agent-message', 'Another Claude session' or 'sent a message while you were working' stands in any of the run's 11 transcripts.
- The first record of each transcript is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill (`usertext.py`). Rung M received one background-task notice of its own command.
- Beside them the harness attached its standing material, and the shared task list: the gather's to-dos, tasks 76 to 81, reached the review, the gate and the commit stage as task reminders, all completed by then (`taskrem.py`). The curator's name stands in six transcripts only where a file of the record names him, as "Pavol's answers" in `PLAN.md`.

## Part 1. Conformance

No departure from a decision of the curator's landed. **No finding of this review would change a decision of his.** The near ones, and why each is not one:
- gather.1's quiet wrong value: P-180 already decides it (fix the row); it needs the first place in the next list, not his answer.
- E1's form departs from the specification's method form; the two give the same answer on every program, and the library's pattern decides the form.
- L.worker.1 and E.skeptic.2 are open questions on which nothing landed; the first may be settled by the specification (section 2).
- P-174's sentence on row 981 is false since L; bringing it in line changes no decision, and the coordinator names the rewording to him.
- The batch record's "The review queue: this record's forks as new items" is stale against his choice of 11:2x UTC (the queue's head); the routing follows his choice.

### Findings for the record, with no decision of his changed

1. **Row 1125 turns a loud failure quiet** (section 3). Owed: the first place in the batch after's additions; F-26's headline, "not by the order in which they are written", and F-253's "walk chooses the inner one" are short for that shape (by reading: the first met is kept), and F-405 names the row.
2. **Rung M ran a comparison nobody asked for, past the wait limit** (section 7): 489K, 398K of it one cache refill. Owed: process finding 1.
3. **Two items on his list are the coordinator's** (E.worker.1, a test for the next brief; E.worker.2, a coordinator tool). Owed: both off his list, with the coordinator's choice; F-404 holds the tool's fact.
4. **Two items need the coordinator's check before they are put to him** (L.worker.1 against `overloading.tex:149-151`; E.skeptic.2 against P-26). Owed: the check; then a queue item in (b) for each that stays open.
5. **review.1 is the batch's own correction,** owed under `references/specification.md:22`, not a question.
6. **The batch record's lines that the landing made stale:** "The review queue: this record's forks as new items" (`CLIMB-BATCH-35.md:788`), against the queue's head; `PLAN.md:119`, phase 5's line naming row 815 as waiting (`RECORD.md`, "Left for the coordinator").
7. **The plan's words were wider or narrower than what landed in three places:** fork L1's "chooses among the overloads that fit the call's number of arguments" (the repair is where the name was lost, and reaches every form); fork M2's two ways (a forwarder at the call's arrow beside the written method); section M's six closed rows (row 390 closed with them).
8. **The skeptics' fixes were right:** two defects of a change (L's key by kinds, M's type-variable receiver), one older defect fixed at a shared site (L's `compatible`), eight rows recorded with tests where a test can show them, and the reports' citations corrected.

### Corrections owed in the record

- **POSITIONS:** P-174's last two sentences (`POSITIONS.md:106`): "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row, where ...". The first is false since `5c31f2b68a`, and with it the "too". L's `REPORT.md`, "P-174's sentences on row 981", gives words that hold; the record-landing brings them in, and the coordinator names the change to him, as the plan says. The gather and the review left them, as the plan asked.
- **FACTS, false or short, and not reworded by the gather or the review:**
  - F-26's headline and F-253's choice of the inner declaration, short for row 1125's shape (finding 1).
  - F-404 holds; the skill's `worktrees.md:45` contradicts it (Part 3).
  - F-240 and F-53 the commit stage rewrote; they hold.
- **The ledger:** rows 1118 to 1127 filed; 184, 744, 770 and 1112 rewritten; 184, 1057, 1058, 981, 1053, 815 and 390 closed; `ledger.py landing-check` printed 'no finding' at the gather and the review. Row 1100 stays open with its note that its test guards the fix only under `-XX:hashCode=0`; M's `s.total` assertion has no note, by the row's length.

## Part 2. Did the practice hold

### The practice's measures, the last five runs

(B33 run 2; B34 run 1; B34 run 2; B35 run 1; B35 run 2.) The figures before B35 run 2 are `reviews/batch-35-review.md`'s, Part 2.
- Written: 5.74M; 5.12M; 2.10M; 5.69M; 3.94M.
- The tier: Opus each; B35 run 1's second judge on the merged tree on Fable.
- Launches lost to restarts or the disk: 2, 0.52M; 2, 0.44M; 0; 0; 0.
- Per landed rung: 1.43M; 1.02M; 2.10M; 1.14M; 1.31M.
- First calls: 0.995M, 11 cold; 0.86M, 8 cold; 0.52M, 7 cold; 1.18M, 13 cold; 0.63M, 7 cold.
- Cache refills: 0 each before; 1, 398K, this run.
- Refusal cycles: 1 rung, 214K; 1 rung, 156K; 0; 1 rung, 175K; 0.
- Rulings and repairs on the merged tree: 317K; 0; 0; 0.99M and a second gate; 0.
- Skeptic fix commits (defects of the change): 12 (2); 13 (2), one a trim; 3 (0); 8 (1), one a trim; 12 (2), no trim.
- Distance: 0 each time.
- Count stage at the gate: about 65 s; about 105 s; about 105 s; about 73 s; about 69 s, the last two on a 2.30 GHz machine.
- Distance stage at the gate: 117 s; 200 s; 176 s; 127 s; 130 s.
- Skill's load: about 17 %; about 20 %; about 16 %; about 19 %; about 15 %.
- Briefing, estimated: 3.6 %; 2.6 %; 2.3 %; 2.9 %; 1.4 %.
- The statement of the expected failure in the call that first runs a test: not yet the rule; 0 of 5 workers; 1 of 1; 5 of 5; 3 of 3.
- microGPT quick pair: 7 of 7 both, each time.
- Rows closed against rows opened: B35 run 1, 8 (9 fixed) against 8; this run 7 against 10.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **A worker's own measurement ran past the wait limit and refilled the cache** (section 7). Rung M ran a 600 s foreground `javap` comparison of 3,217 classes that its section did not ask for, then waited 648 s; the next call wrote 398K. Proposed (mine): the worker brief's common text says that a comparison of compiled output beyond the section's points is the skeptic's or nobody's, and repeats `session.md:19`'s 240 s, with the background form; `batch-measures.py`'s refill line goes into the check-in's look at a running batch.
2. **The landing work now costs more than the run it prepares** (section 7, span 1): 5.78M, of which the record-landing 4.46M and run 1's review 1.18M, against this run's 3.82M. The orientation update with two quiz rounds wrote 1.58M. Proposed (mine): price the record-landing and the review in the batch record's estimate, and bring the orientation quiz to one round where the first grade passes.
3. **A coordinator tool's defect reached his list** (E.worker.2, F-404). The seeding script leaves out `build-one`, so a seeded worktree's first `ant` target rebuilds the Scala and empties both seeded caches. Proposed (mine): `seed-worktree.sh` copies `ProjectFortress/build-one` where the base build has it, before the batch after; the item leaves his list.
4. **Items that the coordinator or the record settles still reach his list** (E.worker.1, E.worker.2, E.skeptic.1, E.skeptic.3, L.worker.2 and 3): as run 1's process finding 6 and the process review's dead end 1. Proposed (mine): as run 1's, the gather names the entry that settles each item before it files it as a question.
5. **The batch record's "After the landing" predates his queue rule of 11:2x** (Part 1, finding 6). Proposed (mine): the planner's template drops "this record's forks as new items" and says "forks recorded in FACTS; consequential ones to the queue".
6. **The planner's price for rung M did not hold its worker's comparison or its second form,** and the estimate's reserve held no overrun of a rung. Proposed (mine): none beyond finding 1; without the refill M was 16 % over.
7. **Of run 1's process findings:** M ran `ant testOneLibrary` at its end, as finding 2 proposed, and it passed; no gate turned red. The statement rule held (finding 1).

### Misses, by kind

Numbered on from `batch-35-review.md`'s 1424.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** 1425, the re-read's changes to sections E, L and M on the landed tree (L's Appendix I lines, M's `castToTypeBelow` line and its second form of row 815 with `ant testOneLibrary`, E's program over `AplCore`, run 2's skill passages at their lines), in `1e74cf3deb`; and row 1117, found by the re-read (`9f59b0e45f`).
- **The planner's text narrower than what landed:** 1426, fork L1's words; 1427, fork M2's two ways; 1428, section M's rows (row 390).
- **A defect of a change, caught before landing:** 1429, L's key by name and number, under which an object with `h[\nat n\]` beside `h[\T\]` stopped at its construction where the base ran its other methods (L's skeptic, `529e8955ba`); 1430, M's setter on a receiver typed by a type variable (M's skeptic, `35116d1ffb`).
- **An older defect fixed at a shared site:** 1431, `compatible` and a type at a `nat` parameter (L's skeptic, `6fcbe62f95`).
- **A loud failure turned quiet, filed and landed:** 1432, row 1125 (L's skeptic; gather.1).
- **A defect of the tree found and filed, not the batch's:** 1433 to 1437, rows 1118 (E), 1119, 1120 and 1121 (E's skeptic), 1127 (M's skeptic).
- **A remaining form of a closed row, filed:** 1438, rows 1122, 1123, 1124 (L) and 1126 (L's skeptic).
- **A report that said what was not so:** 1439, E's citation of `Literal.rats` for the operator aliases (`4f22796939`); L's provenance of its last run (`8bab93ca66`); M's "record.md gives the skill's text" (`3b93382b30`) and its citations after the fix (`70b4d1c9e4`).
- **Sentences of the specification made short, caught:** 1440, rows 1123 and 1124 and the `comprises` clause in no Appendix I effect (the review, review.1).

Found by this review:
- 1441, rung M's comparison past the wait limit, 398K (process finding 1);
- 1442, F-26 and F-253 short for row 1125's shape (Part 1, finding 1);
- 1443, E.worker.1 and E.worker.2 on his list though the coordinator's (finding 3);
- 1444, the batch record's queue line and `PLAN.md:119` stale (finding 6);
- 1445, sentences of the skill beyond the record's list (Part 3).

**Against the earlier notes.** 16 misses were found before the launch or inside the batch (1425 to 1440), 6 of them defects of the tree that the batch did not make and one a loud failure that it made quiet, for three rungs, against run 1's 21 for five. No departure from a decision of his landed, and no finding goes to him as an ask.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false or needless, read on `main` at `87180e9863`; the batch changed no file under `.claude/` (the commit stage's `git diff --name-only 7a96acc25e HEAD -- .claude/`). The proposed wording is mine; the writer keeps the skill's form. The revival changes are in `compile-ladder/climb-batch-35b/RECORD.md`, "Revival changes, for the skill writer": E's, L's and M's. Since `403a0e60cb` the writer adds no sentence for a new trap: the new rows go to the coordinator, not into the skill.

**Needless or false, on the record's list, checked at their lines:**
1. `references/revival-changes.md:57`: "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." Rewritten: the one library declares `≡` and `≢` over two booleans, as top-level operators.
2. `references/interpreter.md:82`: "It loads two generic dotted methods of one name that differ in their number of parameters ... (ledger row 1057). Give the two methods two names." Goes.
3. `references/interpreter.md:80`: "It refuses a valid pair where the generic declaration's result is a tuple that holds its type parameter ... (ledger row 1058)." Goes.
4. `references/interpreter.md:29`: "A numeral type written in a `comprises` clause loads and runs ... (ledger row 981)." Goes, or narrows to the forms that still load: a return type, a variable's or a field's type (row 1124).
5. `references/compiler.md:174`: "an assignment from outside an object to its `var` field ... Bind the value at the field's type first, as `h: T = High` (ledger row 1053)." Goes.
6. `references/compiler.md:172`: "a call of a functional method of an object that a trait's `comprises` clause lists ... Call it through a value typed as the trait ... (ledger row 815)". Goes; the list at `:171-174` keeps row 839's item, as M's skeptic wrote it (`RECORD.md`, "Left for the coordinator and the skill writer").

**False, on no list:**
- `references/worktrees.md:45`: "Without the warning, `ant compileAll` keeps the seeded caches." False for a worktree seeded from a base build that has `build-one` (F-404). Not made false by the landing: the batch found it. It stays false until the script copies `build-one` (process finding 3).

**Short, on no list** (the writer judges whether a line is needed):
- `references/revival-changes.md:15`: "Walk chooses by declared parameter types, never by the order of the declarations." For two generic dotted methods of one name that differ only in their bounds, walk now keeps the first met (row 1125).

**Sentences that hold, met by the batch:** `references/tests-writing.md:94`, the order; `references/library.md:54`, `ant testOneLibrary` after an edit of one of the fourteen; `references/compiler.md:52`, `=` of two booleans compiled under the one library (row 994), which E's body avoids.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home. Each item that I route carries its kind in one line: a question that waits for him, or a default that only informs him.

**Items for him: each has a home in `PLAN.md:801-810`, none yet in the review queue.** The gather filed fifteen ids in nine entries (`:801-809`); the merged-diff review confirmed them (its `curatorItems`) and added review.1 (`:810`).
- E.worker.1 and E.skeptic.4, first half (`:801`): the coordinator's; owed, off his list.
- E.worker.2 and E.skeptic.4, second half (`:802`): the coordinator's; owed, off his list.
- E.skeptic.1 (`:803`): a default that informs him; row 1121 to the batch after.
- E.skeptic.2 (`:804`): a question that waits for him, after the coordinator's P-26 check; then a queue item in (b), needed by no planned work.
- E.skeptic.3 (`:805`): a default that informs him.
- E.reserved.1 (`:806`): a default that informs him.
- L.worker.1 and L.skeptic.1 (`:807`): a question that waits for him only if the coordinator finds that `overloading.tex:149-151` does not settle it; otherwise a repair of row 744 under P-180.
- L.worker.2, L.worker.3, L.skeptic.2, L.skeptic.3 (`:808`): a default that informs him; P-174's two sentences to the record-landing.
- gather.1 (`:809`): a default that informs him; row 1125 first in the batch after.
- review.1 (`:810`): a default that informs him; the clauses to the next batch that edits either entry.

**Open rows.**
- With a home in a list or an item: 1125 (`:809`), 1121 (`:803`), 1120 (`:804`), 744 (`:807`), 1124 (`:808`), 1123 (`:810`), 1119 (with the prelude, P-37's switch-over).
- **Four have no line of their own in `PLAN.md` or `review-queue.md`:** 1118, 1122, 1126 and 1127. Owed (the homes are mine): each in the batch after's list, 1122 with 1125 (walk's generic load check), 1126 with 1123, 1127 with the checker's rows of the next batch.
- Row 1100 stays open, homed in the batch after's list (`PLAN.md:59`, which says "without row 1100": stale, since the row is open).

**Record defaults.** By the queue's head (his choice of 11:2x UTC on 2026-11-23), run 2's forks, not consequential, need no queue item: F-403, F-405 and F-406 state what E, L and M built, and the batch record keeps the forks. The batch record's line that asks for queue items is stale (Part 1, finding 6). Until his yes to the process review's B1, the record's routing stands as written.

**Queue items that the landing built or made stale:** 503 (its `comprises` form), 576 (row 1053) and 585 (rows 1057 and 1058), already read as settled by the triage (`review-queue.md:900`, `:943`, `:950`); 616 (row 1098), which still heads the batch after.

**PLAN lines that the batch built or made stale.** `PLAN.md:119`, phase 5's line on row 815 (the batch record's "After the landing"); "Next" (`:13`), which names run 2 as coming; `:59`'s list, which lacks this run's rows and the rungs of P-174 and P-165; and `:7`'s "Runs" line, which lists microGPT's 7 of 7 through run 1.

**The manual and the script:** process findings 1, 3 and 5. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. The batch after

**The record's list, with this landing.** `CLIMB-BATCH-35.md`, "What the batch leaves out", keeps climb batch 34b's list: rows 994 and 1091, then `Arr` and `Dot` as run tests, then rows 1098 to 1103. Run 1's review, Part 5, added, by P-180 and in this order: row 1105 with row 1104; rows 1110 and 1111, one rethrow; row 935's order by the declarations' spans, with rows 499, 1046 and 1047's tests, and row 996's order beside it; rows 1106 to 1109; review-routed.1's test; row 594. `PLAN.md:59` holds that list.

**Does it still hold?** Yes, with three changes:
- **Row 1100 is open,** not fixed as the list's "without row 1100" says: its test guards the gate repair only under `-XX:hashCode=0`. It belongs beside row 935's order, which removes the dependence.
- **Row 1098 still waits for review-queue item 616's default** before the list reaches it (the queue's head).
- **Row 994 now also stands where `QQ.isFinite` stops,** at `=/=`, since M's overload methods let the call reach it (M's `SKEPTIC.md`, `SkOneQQ`).

**The two rungs that his decisions of 2026-11-23 need.**
- **P-174, a numeral coercion's body with no method invocation, `Byte(v)`.** Its reach, as P-174's history of 16:08Z gives it: the one library's numeral coercions that call a getter on the four numbers (`Library/FortressLibrary.fss:388-389`, `:847`, `:954`, `:1065`), the checker's reading of each number as a `ZZ` (`KindEnv.getType`, F-342), `Specification/basic/expressions/literals.tex:186-188`, 13 test files, rung R's two among them, and the skill's `revival-changes.md:99`, "Under walk, write `Byte(v.asZZ32)`". The planner reproduces each and files its row.
- **P-165, the getter `asRR64` in place of `asFloat`.** About 30 lines of the one library, 51 test and demo files, `Specification/basic-lib/numbers.tex:58-75`, and the skill's `library.md:23` and `revival-changes.md:112` (the boot note's count).
- Neither is on `PLAN.md:59`'s list yet; the boot note's "Next" holds them.

**The rows that P-180 sends to it from this run, in this order:**
1. Row 1125, the loud failure that rung L made quiet, with row 1122, the same restriction at `returnRuleAtEveryInstance`.
2. Row 1121, `⊕`, `⊼` and `⊽` in the one library beside E's two, before the switch-over drops the prelude's.
3. Rows 1123 and 1126, the remaining forms of generic methods of one name under walk.
4. Row 1118, the chain's undeclared operator under walk.
5. Row 1127, the checker's return type at a comprised object, with row 1112.
6. Row 744 and row 1120 once their questions are settled; row 1124 with P-12's step or a rung, as the coordinator routes item 503's other forms.
7. review.1's Appendix I clauses with the first rung that edits either entry.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I read the run's transcripts through scripts and the journal's results. For run 1's landing work and the preparation, I read only the transcripts' labels, times, models, first messages and writes. I read the coordinating session's transcript for its own writes by time, for the launch's Workflow call, and for user records during the run.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times and the reflogs.
- These are by reading, not run:
  - that `putIfAbsent` keeps the first met for row 1125's shape, and so that F-26 and F-253 are short for it;
  - that `overloading.tex:149-151` makes the generic instance the text's answer for row 744;
  - that E1's form and the method form give the same answer on every program;
  - that row 1122 is one line.
- I did not check each rung's reported runs against its logs; the skeptics and the merged-diff review did, and I cite them. I read the source diffs of the three rungs whole, and of the tests only the programs that the decisions name.
- The skill's load is a rough count, not `skill-load.py`'s. The split of the spans by purpose is by each transcript's first message and label.

## The steps due before the batch after

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept (tasks 76 to 81; the boot note says swept); each decision named in one line.
2. **The record-landing workflow for run 2** (`tools/record-landing/README.md`, with `batch: '35b'`, `base: '5a595515546edc5564515d4492ff4d44b5d07153'`, `landing: '1caac80b3b'`'s full hash), with Part 3's list for the skill writer and P-174's two sentences, which the coordinator then names to him with old and new words.
3. **The record's corrections** (Part 1): F-26 and F-253 for row 1125; review.1's clauses homed.
4. **The routing that no list holds yet** (Part 4): homes for rows 1118, 1122, 1126 and 1127; E.worker.1 and E.worker.2 off his list, with the coordinator's choices; the checks of L.worker.1 against `overloading.tex:149-151` and of E.skeptic.2 against P-26, then a queue item for each that stays open; `PLAN.md:119`, "Next", `:59`'s list and the "Runs" line.
5. **`seed-worktree.sh` copies `build-one`** (process finding 3), before the next seeded worktree.
6. **The base build of the landed tree** at `1caac80b3b`, and F-34's measure on it (the manual's routing, step 1a).
7. **The batch after's plan** (Part 5): the record's list with row 1100 open and row 994's new site; the rungs of P-174 and P-165; this run's rows in the order given; item 616's default before row 1098.
8. **The script and the manual** (process findings 1 and 5), before the next launch: the wait limit and the unasked comparison in the worker brief; the planner's template without the queue line.

## For the curator

Run 2 of climb batch 35 ran from 17:50 UTC to 20:59 UTC on 23 November. In your time that is 18:50 to 21:59. It is pushed. All three tasks landed. No line of the model program changed. You gave the go at 08:4x UTC: "Clean up row and workarounds the skill teaches. Fix low hanging fruit!" Every decision took the planner's default, and this section is your review of them.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **one library** is the library of the interpreter. The compiled path also has its own small library, the **prelude**, which goes at the switch-over.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the worker's change and fixes what it finds.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- A **row** is one known defect in the ledger. A **workaround** is advice in the skill on how to live with a defect.
- The **gate** is the full check before a run lands.

**What each task changed.** Each program is shortened from the tests that landed.

- **E. `≡` and `≢` on two booleans.** The one library changed.

      t: Boolean = true
      f: Boolean = false
      println(t ≡ f)
      println(t ≢ f)

  - Before: walk stopped on `t ≡ f` with an internal error, and refused `t ≢ f` before the run. The compiled path printed `false` and `true` with its prelude only.
  - Now: `false` and `true` under walk and on the compiled path with the one library, so after the switch-over too.
  - On two objects of your own type, `≡` is a type error on both paths, as the specification says.

- **L. Three walk errors that the compiled path did not have.** Walk changed.

      object Two
          tk[\U\](y: U, z: U): U = z
          tk[\U\](y: U, z: U, w: U): U = w
      end
      println(Two.tk(1, 2, 3))

  - Before: walk stopped: 'Cannot find definition for method tk given receiver Two'. The compiled path printed 3.
  - Now: 3 on both.

      object Dot extends Number end
      pt[\T extends Number\](a: T): (T, ZZ32) = (a, 1)
      pt(a: Dot): (Dot, ZZ32) = (a, 2)

  - Before: walk refused this valid pair when it loaded the program. Now walk runs it, as the compiled path does.

      trait T comprises { NaturalNumeral[\1, 10, 3\] } end

  - Before: walk ran this, against your rule that a numeral type is only a parameter's type. Now walk refuses it, as the checker does.
  - One step back, in one shape:

        object Nested
            tk[\U extends Number\](y: U): ZZ32 = 2
            tk[\U extends ZZ32\](y: U): ZZ32 = 3
        end
        n: ZZ32 = 5
        println(Nested.tk(n))

    Before, walk stopped with an error. Now it prints 2. The right answer is 3. No program that ran before gives another value now, but a loud error became a quiet wrong answer. It is row 1125. Your rule P-180 says that it gets fixed, so it goes first into the next list.

- **M. Two compiled crashes where walk runs.** The code generator changed.

      trait T end
      object Low extends T end
      object High extends T end
      object Cell(var t: T) end
      c = Cell(Low)
      c.t := High

  - Before: compiled, this crashed: 'NoSuchMethodError'. Now it runs.

      trait Q comprises { R }
          abstract num(self): ZZ32
      end
      object R extends Q
          num(self): ZZ32 = 1
      end
      println(num(R))

  - Before: compiled, it crashed the same way. The code generator had not written the needed method since 2012. Now it prints 1, as walk does.
  - Also now: a third crash of the same cause is gone, a call that one function takes directly and another by a conversion (row 390).

**The full check.** The first full check passed: 3,698 tests, no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The decisions that took the planner's default.** Each one can be undone.
- **E1. `≡` and `≢` are top-level operators beside `<->`,** as the one library writes all its boolean operators. The other way: methods of `Boolean`, as the specification and the prelude write them. Both give the same answer on every program.
- **L1. Walk takes each generic method of a name, and the call's arguments choose.** The plan said: choose by the number of arguments. What landed covers that and more. No other way was proposed.
- **L2. Walk reads a tuple result element by element.** No other way was proposed.
- **L3. Walk refuses a numeral type in a `comprises` clause.** The other three places where a numeral type is still written, a return type, a variable's type and a field's type, still load under walk (row 1124).
- **M1. An assignment to a field passes the value at the field's type.** No other way was proposed.
- **M2. The code generator writes the method that a call names,** and, where needed, a second method at the call's own type that passes the call on. The other way: make each call through the trait.

**The items on your list.** None needs your answer to go on. Two may be questions for you, after the coordinator checks the record:
- Which ASCII names of `≢`, `⊄` and `⊈` the parser reads: two passages of the specification disagree (row 1120).
- Under walk, a call that writes static arguments to a name with a plain and a generic method: by my reading the specification takes the generic one, which walk would then repair; it still stops, as before (row 744).
- The rest only tell you what landed or what comes: a one-library run test; the worktree script's gap; `⊕`, `⊼` and `⊽` in the one library next; a misprint in the specification's `NOR` entry; the APL experiments' library, which now answers `≡` on booleans; the three other numeral-type places; the step back above; and two rows that Appendix I does not yet name. Two of these are the coordinator's, not yours: the test and the script.

**Your rule P-180 in this run.** Six workaround passages of the skill are now needless. Seven rows closed, one more than planned. Ten new rows opened: one is the step back above, four are remaining forms of the fixed rows, and five are older defects that the tasks found. Over both runs: 15 closed and 18 opened.

**Your decisions of today.** P-174, a coercion's body with no method calls, `Byte(v)`, and P-165, the getter `asRR64`, each need a task. The next batch takes them with its list.

**Three events.**
- **No agent ran twice.** No restart fell in the run.
- **Nothing else was committed while the run merged its tasks.**
- **No message of yours reached an agent.** You sent none during the run.

**The cost.** The run wrote 3.94M tokens. The estimate was 3.0M, and 3.6M with its reserve. One task, M, wrote 1.27M against 0.75M: its worker compared the compiled libraries class by class, which nobody asked, and one long wait cost 0.4M of that.

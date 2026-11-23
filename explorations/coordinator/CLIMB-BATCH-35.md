<!-- The record of climb batch 35, in two runs (climb batch 35 and climb batch 35b), for the coordinating session, the curator and the batch's workers: the housekeeping batch of P-180, the low-hanging fruit of the inventory of the fortress-repo skill's workaround passages, each fix closing its ledger row, test first, chosen where walk and the compiled path behave differently or depart from the specification. Run 1, five rungs: a numeral with a radix point keeps its leading zeros in its digit count (R, row 960); walk's subscript before a superscript and its top-level tuple binding run once (W, rows 1 and 1026); the compiled dispatch method of a functional method whose self is not first (S, rows 573 and 1038); the modifier override compiled and checked (O, rows 650 and 653); an exit out of an atomic block keeps its writes on both paths (A, row 1039). Run 2, three rungs on run 1's landed tree: the logical equivalence of two booleans in the one library (E, row 184); three departures of walk's load check and dispatch (L, rows 1057, 1058 and 981); two run-time failures of compiled calls that the checker accepts (M, rows 1053 and 815). -->
<!-- History. Drafted 2026-11-23 by the planning worker of climb batch 35, on Opus, against `main` with the code of `295c215c2c`, the base build `/home/user/fortress-base42` (`git diff --stat 295c215c2c HEAD -- . ':!explorations' ':!docs' ':!.claude'` prints nothing on `414a1aef42`). -->
<!-- **The go.** The curator's go, dictated at 08:4x UTC on 2026-11-23: "Clean up row and workarounds the skill teaches. Fix low hanging fruit!", with the Fable review of this record given in advance. The batch launches after that review. A fix that needs a decision of his stays out of the batch. -->
<!-- Sources: the planner's brief (`<scratchpad>/batch35/planner-35-brief.md`); POSITIONS P-180 with its history, P-174, P-37, P-148, P-12; FACTS F-53, F-88, F-257, F-292, F-315, F-341, F-363, F-369, F-372, F-373, F-374, F-375, F-377, F-387; the inventory `compile-ladder/plan-35/probes/skill-workarounds.md` (`161b673e65`), whole; `reviews/batch-34-review.md` and `reviews/batch-34b-review.md`, section 6 and Part 5; review-queue items 44, 73, 401, 461, 462, 473, 502, 503, 540, 557, 558, 559, 561, 562, 564, 576, 585, 592, 598; the ledger rows named in section 1; the `coordinator` skill's `references/batch.md`, "The go" and "The workflow"; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; `CLIMB-BATCH-34.md` for the form; the code at the sites. -->
<!-- The planner's probes: `compile-ladder/plan-35/probes/fixes-35.md`, with its programs in `programs/` beside it, run in a worktree of the planner's own, `/home/user/fortress-p35`, seeded from the base build and removed after. Every defect that a rung takes was reproduced there on the base, walk and compiled, through the harness; two marked hacks sized rungs O and E. No gate stage, no whole suite and no timing ran. -->

# Climb batch 35

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 35, holds R, W, S, O and A in that order; run 2, climb batch 35b, holds E, L and M. No two rungs of a run are expected to edit one file; where a rung may reach a file that another names, section 4, "The rule the rungs keep", gives each its members. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-35.md#`, PRB for `doc:explorations/compile-ladder/plan-35/probes/fixes-35.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main`, each of the 67 distinct keys matching one place, REC's on this record as committed.

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | R | `rung-radix-point-leading-zeros` | A numeral with a radix point keeps its leading zeros in its digit count, on both paths | 120 |
| 1 | W | `rung-walk-subscript-tuple-binding` | Walk's subscript before a superscript, and its top-level tuple binding run once | 150 |
| 1 | S | `rung-self-not-first-dispatch` | The compiled dispatch method of a functional method whose self is not first | 150 |
| 1 | O | `rung-override-compiled` | The modifier override compiled, and the checker's refusal of one that overrides nothing | 240 |
| 1 | A | `rung-exit-out-of-atomic` | An exit out of an atomic block keeps the block's writes, on both paths | 210 |
| 2 | E | `rung-boolean-equivalence` | The logical equivalence of two booleans in the one library | 120 |
| 2 | L | `rung-walk-load-check-generic-numeral` | Three of walk's departures at generic and numeral declarations | 180 |
| 2 | M | `rung-compiled-missing-methods` | Two compiled calls that the checker accepts and that die at run time | 180 |

Fields common to the eight rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-radix-point-leading-zeros`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none: every new or promoted test is in a gated folder. **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. Run 2 is written on run 1's landed tree, and none of its rungs needs a rung of run 1 (section 2, "The two runs").
- **its test is the stage:** no. **the stages:** R, O and E run the count stage and the distance stage once on their final trees, as a step of their sections: R edits the node that the parser makes for every numeral with a radix point, which the checker reads in the library; O edits the checker; E edits `FortressLibrary`. W, S, A, L and M run neither and list their files (`STAGE_BLIND`): their edits are in walk, the code generator or the run time, which the stages do not run.
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 34b's gate left them (F-53). **expected checker crash:** none.

### R
- **slug:** `rung-radix-point-leading-zeros`
- **worktree:** `/home/user/fortress-radix-point-leading-zeros`
- **section:** `R. A numeral with a radix point keeps its leading zeros in its digit count, on both paths (row 960)`
- **blurb:** the parser's node for a numeral with a radix point keeps only one of its leading zeros, so a program's coercion over the numeral's four numbers reads the digit count n = 2 for 00.5, where the count is 3 (row 960), on walk and on the compiled path alike. The rung makes the node keep the digits as written, so that both paths count them.
- **points to report:**
  - The fix as made, and every reader of the node's text that now sees the leading zeros.
  - Row 960's test promoted and its compiled twin, each failing on the base and passing after.
  - Each sentence of the specification that your change makes false, before and after.
  - The two stages' tables on your final tree against the comparand.
  - A file edited beyond those named.
- **briefing** (9 keys, 5 checks):
  - ledger:960 (check): the digit count, which closes.
  - P-174 (check): a numeral's type and its four numbers, n the count of its digits.
  - SPEC `basic/expressions/literals.tex#Literals`: the numeral types and their static arguments.
  - SRC `nodes_util/ExprFactory.java#public static FloatLiteralExpr makeFloatLiteralExpr(Span span, String s)` (check): where the leading zeros are trimmed.
  - SRC `nodes_util/NumeralNumbers.java#public static NumeralNumbers of(FloatLiteralExpr x)`: where both paths count the digits.
  - `code:ProjectFortress/compiler_tests/FloatLiteralValuePrint.fss#value object Dec(src: String)`: a compiled coercion that reads the four numbers, the precedent of the compiled test.
  - PRB `1. Under walk, on the base` (check): the walk test's failure on the base.
  - `map:compile-path-walkthrough.md#1. Parsing and the syntax tree`: where the node is made, before both paths.
  - REC `Forks the batch takes` (check): the defaults you build.

### W
- **slug:** `rung-walk-subscript-tuple-binding`
- **worktree:** `/home/user/fortress-walk-subscript-tuple-binding`
- **section:** `W. Walk's subscript before a superscript, and its top-level tuple binding run once (rows 1 and 1026)`
- **blurb:** two forms that the compiled path runs as the specification says and walk does not. Walk applies a subscript followed by a superscript without its first index, so m[3,7]^2 is (m[7])^2 and x[5]^2 stops (row 1). Walk runs the right side of a top-level tuple binding once for each name and once more, from a field of the right side in place of the temporary that it binds (row 1026). The rung repairs both in walk.
- **points to report:**
  - Each fix as made, by file and member.
  - Row 1's new test and row 1026's promoted one, each failing on the base and passing after; the form after a dotted call, B.f()[5]^2.
  - Row 152's notes as rewritten.
  - Walk's suite: every test that failed after your change, with its cause.
  - A file edited beyond those named.
- **briefing** (11 keys, 7 checks):
  - ledger:1 (check): the subscript before a superscript, which closes.
  - ledger:1026 (check): the tuple binding, which closes.
  - ledger:152: its notes say that an earlier model program's corpus loads once, which row 1026 contradicts.
  - F-387: the compiled path's reading of the same primary, the answer walk must give.
  - F-369: the compiled tuple binding, whose right side runs once.
  - SPEC `basic/variables.tex#Top-Level Variable Declarations` (check): what a top-level tuple binding does.
  - SRC `interpreter/evaluator/Evaluator.java#private FValue mathItemApplication(NonExprMI opr, FValue front, MathItem loc)` (check): where the subscript loses its first index.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forSubscriptExpr(SubscriptExpr x)`: a subscript that evaluates all its indices, the precedent.
  - SRC `interpreter/rewrite/DesugarerVisitor.java#public Node forVarDecl(VarDecl vd)` (check): the temporary and the names' initializers.
  - PRB `1. Under walk, on the base` (check): both failures on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### S
- **slug:** `rung-self-not-first-dispatch`
- **worktree:** `/home/user/fortress-self-not-first-dispatch`
- **section:** `S. The dispatch method of an object's functional method whose self is not first tests the arguments, not the receiver, on the compiled path (rows 573 and 1038)`
- **blurb:** where an object overloads an inherited functional method by declarations of its own whose self is not first, its class's dispatch method tests and casts the receiver where it should test an argument: a call dies with ClassCastException (row 573), or answers the object's declaration for every argument with no error (row 1038). Walk dispatches by the arguments. The rung makes the dispatch method test each argument at its own place.
- **points to report:**
  - The dispatch method as fixed: which local each type test and cast reads, for self first, second and last.
  - The three expected failures promoted, each failing on the base and passing after.
  - Row 594's test after your fix: still failing, or not.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (8 keys, 6 checks):
  - ledger:573 (check): the cast of the receiver, which closes.
  - ledger:1038 (check): the wrong answer with no error, which closes.
  - ledger:594: a generic functional method with self not first, a sibling at another site, which stays.
  - F-372: the code generator's methods of an object, and where rung M of climb batch 31 left this dispatch method.
  - SPEC `basic/overloading.tex#Overloading Resolution` (check): which declaration a call runs.
  - SRC `compiler/OverloadSet.java#static public class ForTraitOrObject extends AmongApis` (check): the overload set of a trait's or object's method, its self index and its first argument.
  - PRB `2. Compiled, against the prelude, on the base` (check): the three failures on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### O
- **slug:** `rung-override-compiled`
- **worktree:** `/home/user/fortress-override-compiled`
- **section:** `O. The modifier override on the compiled path: the code generator compiles it, and the checker refuses one that overrides nothing (rows 650 and 653)`
- **blurb:** walk runs a method declared override and refuses at load one that overrides nothing, as the traits chapter says. The code generator refuses every declaration with the modifier (row 650); let through, the object's class gets the override and a second method of its name for the declaration that it hides, and fails to load. The checker accepts an override that overrides nothing (row 653). The rung compiles the modifier, the class holding what the checker reads as provided, and has the checker refuse an override that overrides nothing.
- **points to report:**
  - Where the code generator now reads the override's hiding, and the methods of the object's class for the promoted test.
  - Where the checker now refuses an override that overrides nothing, its message, and the cases of walk's tests that it follows.
  - The tests, each failing on the base and passing after; row 694's form after your fix.
  - Every line of the libraries or the tests that the checker now refuses, and what you did with each.
  - The two stages' tables on your final tree against the comparand, and the checker's timing before and after.
  - Each sentence of the specification that your change makes false, before and after.
  - A file edited beyond those named.
- **briefing** (12 keys, 8 checks):
  - P-148: the checker's timing after a change.
  - ledger:650 (check): the code generator's refusal, which closes.
  - ledger:653 (check): the checker's acceptance, which closes.
  - ledger:694: a dotted call with numerals that keeps an overridden declaration, a sibling that stays.
  - F-88 (check): the checker's reading of what a type provides, and of an override.
  - F-372: the code generator writes each inherited method once, by the lowest type that declares it.
  - SPEC `basic/traits.tex#Method Declarations` (check): the modifier override and its rule.
  - SRC `compiler/codegen/CodeGen.java#public void forFnDecl(FnDecl x)` (check): the refusal of the modifier.
  - SRC `scala_src/useful/STypesUtil.scala#def providedAndOverridden(tt: TraitType,` (check): the checker's table of what an override keeps from being inherited.
  - SRC `interpreter/evaluator/values/Constructor.java#has the modifier override and does not override any inherited declaration`: walk's refusal, the words and the cases to follow.
  - PRB `3. The override modifier let through (PROBE 35 HACK, not kept)` (check): the second wall.
  - REC `Forks the batch takes` (check): the defaults you build.

### A
- **slug:** `rung-exit-out-of-atomic`
- **worktree:** `/home/user/fortress-exit-out-of-atomic`
- **section:** `A. An exit out of an atomic block keeps the block's writes, on both paths (row 1039)`
- **blurb:** the specification keeps the writes of an atomic block that an exit leaves for an enclosing label. Both paths discard them: the compiled handler ends the transaction without a commit for anything but an abort, and walk's transaction runner commits only after a normal end (row 1039). The rung commits the block's transaction when an exit leaves it, on both paths.
- **points to report:**
  - The commit as built on each path, and what a failed commit does.
  - The two expected failures promoted, and the nested case, each failing on the base and passing after, at one thread and at four.
  - The four-thread atomic runs on your final tree.
  - Walk's suite: every test that failed after your change, with its cause.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (10 keys, 6 checks):
  - ledger:1039 (check): the discarded writes, which closes.
  - ledger:1041: an exit that runs after its label block completed, a question that waits for the curator and stays.
  - F-373 (check): the compiled exit, a thrown LabelExit.
  - F-374: the compiled cells and the atomic block.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): what an exit out of an atomic block keeps.
  - SPEC `basic/expressions/label.tex#Label and Exit`: what an exit does.
  - SRC `runtimeSystem/BaseTask.java#public static void leaveTransaction(Throwable t)` (check): the compiled handler's end of the transaction.
  - SRC `interpreter/evaluator/tasks/FortressTaskRunner.java#public static <T> T doItOnce(Callable<T> xaction)` (check): walk's transaction around an atomic block.
  - PRB `2. Compiled, against the prelude, on the base`: the compiled failure on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### E
- **slug:** `rung-boolean-equivalence`
- **worktree:** `/home/user/fortress-boolean-equivalence`
- **section:** `E. The logical equivalence of two booleans in the one library (row 184)`
- **blurb:** the specification's Boolean has the operator EQV, logical equivalence, and the compiler's prelude declares it and its negation NEQV. The one library declares neither, so walk stops on t EQV f with an internal error (row 184), and the compiled path would lose the operator at the switch-over. The rung declares the two operators over two booleans in the one library, in its own form beside its operator <->.
- **points to report:**
  - The declarations as written, and their place.
  - The tests, each failing on the base and passing after; row 184's own program, two objects compared, after your change.
  - Row 184 as rewritten.
  - The onelibrary track, and the two stages' tables on your final tree against the comparand.
  - A file edited beyond those named.
- **briefing** (9 keys, 5 checks):
  - ledger:184 (check): the internal error, which closes.
  - P-37: the prelude gains no declaration.
  - `code:Library/FortressLibrary.fsi#opr <->(a: Boolean, b:Boolean):Boolean` (check): the one library's boolean operators, where the two go.
  - `code:Library/FortressLibrary.fss#opr <->(a: Boolean, b:Boolean):Boolean = a=b`: the body of the nearest one.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr EQV(self, other:Boolean):Boolean` (check): the prelude's declaration, which the compiled path runs today.
  - SRC `interpreter/evaluator/Evaluator.java#private FValue getOp(FunctionalRef op)`: where walk stops today.
  - PRB `4. The logical equivalence of two booleans in the one library (PROBE 35 HACK, not kept)` (check): the fix tried, its error for two objects, and microGPT's quick pair beside it.
  - `map:modules-and-phases.md#B.13 Where each library enters`: how a program sees the one library's top-level operators.
  - REC `Forks the batch takes` (check): the defaults you build.

### L
- **slug:** `rung-walk-load-check-generic-numeral`
- **worktree:** `/home/user/fortress-walk-load-check-generic-numeral`
- **section:** `L. Three of walk's departures at generic and numeral declarations: dotted methods of two arities, a tuple result, and a numeral type in a comprises clause (rows 1057, 1058 and 981)`
- **blurb:** three places where walk departs and the compiled path is right: two generic dotted methods of one name that differ in their number of parameters fail at a call (row 1057); a valid pair whose generic result is a tuple that holds its type parameter is refused at load (row 1058); a numeral type in a comprises clause loads, where walk refuses one in an extends clause (row 981). The rung repairs the three in walk.
- **points to report:**
  - Each fix as made, by file and member.
  - The three expected failures promoted, each failing on the base and passing after.
  - Walk's suite: every test that failed after your change, with its cause; a line of the library that walk now refuses at load.
  - Each sentence of the specification that your change makes false, before and after.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (11 keys, 7 checks):
  - ledger:1057 (check): the dotted methods of two arities, which closes.
  - ledger:1058 (check): the tuple result, which closes.
  - ledger:981 (check): the numeral type in a comprises clause, which closes.
  - P-174 (check): a numeral type is written only as a parameter's type.
  - F-375: walk's load check of a generic declaration beside a plain one over an object type.
  - SPEC `basic/overloading.tex#Applicability to Dotted Method Calls` (check): which dotted methods apply to a call.
  - SPEC `advanced/overloading.tex#Declarations with Static Parameters` (check): the Return Type Rule for a generic declaration.
  - SRC `interpreter/evaluator/values/DottedMethodApplication.java#Cannot find definition for method `: where the call fails.
  - SRC `interpreter/evaluator/values/OverloadedFunction.java#static private boolean returnRuleAtObjectArguments(SingleFcn inner, List<FType> dIn,`: the reading at object arguments.
  - SRC `interpreter/evaluator/BuildEnvironments.java#public static void checkNumeralTypesWritten(List<? extends CUWrapper> units)`: the check that leaves out a comprises clause.
  - REC `Forks the batch takes` (check): the defaults you build.

### M
- **slug:** `rung-compiled-missing-methods`
- **worktree:** `/home/user/fortress-compiled-missing-methods`
- **section:** `M. Two compiled calls that the checker accepts and that die at run time: a var field assigned a narrower value, and a functional method of a comprised object (rows 1053 and 815)`
- **blurb:** two compiled calls link clean and die with NoSuchMethodError where walk runs them: an assignment from outside an object to its var field of a value of a strict subtype, whose setter call names the value's type in place of the field's (row 1053); a functional method of an object that a trait's comprises clause lists, called on a value typed as the object, whose overload method the component's class does not hold (row 815). The rung makes each call name a method that the class holds.
- **points to report:**
  - Each fix as made, by file and member, and where row 815's overload method is now written.
  - The two expected failures promoted, and row 1053's second form, each failing on the base and passing after.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (10 keys, 6 checks):
  - ledger:1053 (check): the setter call, which closes.
  - ledger:815 (check): the missing overload method, which closes.
  - F-377 (check): the cast of a value that has self's type, which row 1053's second form needs.
  - F-374: a compiled var field in a cell, and its setter.
  - SPEC `basic/expressions/bindings.tex#Assignments` (check): what an assignment to a field does.
  - SPEC `basic/traits.tex#Method Declarations`: a functional method declared in a trait and defined in an object.
  - SRC `compiler/codegen/CodeGen.java#public void forAssignment(Assignment x)` (check): the assignment's code.
  - SRC `compiler/codegen/CodeGen.java#private void castToTypeBelow(Expr expr, Type declared)`: the cast, the precedent.
  - `doc:explorations/compile-ladder/rung-export-align/REPORT.md#8. Defects and their homes`: row 815's program and outputs.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** first checks a program's types with the **checker**, then writes JVM bytecode with the **code generator**, and the **run time** runs it.
- The **prelude** is the small library that the compiled path uses today. The **one library** is the interpreter's library. At the **switch-over**, the compiled path moves onto the one library and the prelude is deleted.
- A **row** is one known defect in the gap ledger. An **expected-failure test** is a test that is known to fail and is marked so; to **promote** it is to make it a plain test once the fix lands.
- A **workaround passage** is a sentence of the `fortress-repo` skill that tells a worker how to live with a defect. Your decision P-180 says such a defect is fixed, and the passage goes.
- A **rung** is one fix, built by one worker and checked by a second, the skeptic. A **run** is one launch of the batch workflow. The **gate** is the full test pass before a run lands.
- A **fork** is a choice that the batch makes. Its **default** is the way it builds unless you say otherwise.
- **Dispatch** is the choice of which declaration of an overloaded name a call runs. A **functional method** is a method called like a function, `f(x)`, with `self` among its parameters, not always first.
- An **atomic block** runs as one transaction: other tasks see all of its writes or none. A **label** block can be left early by an **exit**.
- A **numeral** is a number as written, such as `00.5`. A program's own number type takes a numeral through a **coercion** that reads the numeral's four numbers, among them its count of digits.
- Walk's **load check** refuses some invalid programs before they run, as the checker does on the compiled path.
- **microGPT** is the model program. No rung changes a line of it.

### The go

You gave it today at 08:4x UTC: "Clean up row and workarounds the skill teaches. Fix low hanging fruit!", with the Fable review of this record in advance. The batch launches after that review. I found no fork that needs your answer first: by my reading none bends a decision of yours, and none changes a line of microGPT. Section 3 says why, fork by fork.

### The two runs

- **Run 1, climb batch 35, five rungs:** R, W, S, O and A. Each closes one or two rows where walk and the compiled path give different answers, or both depart from the specification.
- **Run 2, climb batch 35b, three rungs:** E, L and M, the same kind, on run 1's landed tree.
- **Why two runs.** The disk. The batch script needs 1.5 GB a rung plus 4 GB free before it starts. About 12.0 GB is free, so a run holds five rungs at most. No rung of run 2 needs one of run 1.
- **How they were chosen.** From the inventory of 98 fixes with no fork, those where the two paths differ or depart from the specification, that a person writing Fortress meets, and that are cheap. Row 960, the leading zeros you named, is rung R.

### What the probes found

I reproduced every defect that a rung takes on today's code, through the test harness, on walk and on the compiled path. Each fails as its row says. Two quick trial fixes in a scratch tree sized two rungs:

- **Override (rung O).** Letting the code generator accept the word `override` is not enough: the object's compiled class then fails to load, because it gets the overriding method and a second method of the same name. So rung O is a real rung, not a one-line fix.
- **Boolean equivalence (rung E).** Adding the operator to the one library makes walk's test pass, turns its internal error into an ordinary type error for two objects, and leaves microGPT's quick checks at 7 of 7 for both programs.

Three entries of the inventory turned out to need a decision of yours, so they left the batch (section "The forks that wait for you", item 3 and 6). One more, row 1017, is real and needs no decision, but it is not small: its fix changes which declaration many calls with numerals run, so it waits for a later batch with a count of what it changes.

### Run 1, rung by rung

Each program is shortened to the lines that matter.

**R. The digits of `00.5`.**

- What it changes: the parser's node for a numeral with a radix point, which both paths read.
- A program's own number type can read how many digits a numeral has:

      object Digits(count: ZZ32)
        coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) = Digits(n.asZZ32)
      end
      d: Digits = 00.5

- Today: `d.count` is 2 on both paths. The parser drops all leading zeros but one.
- After: 3, the digits as written. A whole number such as `007` already counts 3.
- The choice (fork R1): the node keeps the digits as written. Nothing else in the library or the tests writes a numeral like `00.5`.

**W. Two walk errors the compiled path does not have.**

- What it changes: walk only.
- First, a subscript then a power:

      x: ZZ32[7] = [1 2 3 4 5 6 7]
      println(x[5]^2)

- Today: walk stops, 'Failed to find any matching overload'. With two indices, `m[3,7]^2`, it silently squares `m[7]` instead. The compiled path prints 36. The skill tells workers to write `(x[5])^2`.
- After: 36 on both.
- Second, a tuple bound at the top level:

      (first, second) = pairOnce()

- Today: walk runs `pairOnce` three times, and `first` and `second` can come from different runs. The compiled path runs it once.
- After: once, on both. microGPT's two programs bind their constants this way; they now run once at load, with the same values.

**S. A method called like a function, with `self` not first.**

- What it changes: the code generator.
- The program:

      trait P  mark(x: Any, self): ZZ32 = 1  end
      object Pq extends { K, P }  mark(x: K, self): ZZ32 = 3  end
      mark(1, Pq)

- Today: compiled, this answers 3, silently wrong; other shapes crash with a cast error. Walk answers 1. The compiled choice looks at the object where it should look at the argument.
- After: 1 on both. The skill's advice "Put `self` first" goes.

**O. The word `override`.**

- What it changes: the code generator and the checker.
- The program:

      trait A  f(self, other: ZZ32): String = "A"  end
      object B extends A  override f(self, other: Number): String = "B"  end
      f(B, 17)

- Today: walk prints `B`. The compiled path refuses to compile any method marked `override`. And a method marked `override` that overrides nothing is refused by walk, as the specification says, but accepted by the checker.
- After: compiled, it prints `B`; and the checker refuses an `override` that overrides nothing, as walk does.

**A. Leaving an atomic block with `exit`.**

- What it changes: walk's transactions and the compiled run time.
- The program:

      var g: ZZ32 = 0
      label done
        atomic do  g := 7; exit done  end
      end done
      println(g)

- Today: 0 on both paths. The specification says an exit keeps the block's writes, so 7. The skill tells workers to set a flag and exit after the block.
- After: 7 on both. An exception, as opposed to an exit, still throws the writes away, as the specification says.

### Run 2, rung by rung

**E. `a ≡ b` on booleans.**

- What it changes: two lines in each of two files of the one library.
- The program: `println(true ≡ false)`.
- Today: walk stops with an internal error, '** bug! Expect all oprefs to be top level EQV'. Compiled, against the prelude, it prints `false`. After the switch-over the compiled path would lose it too. The skill tells workers to write `a <-> b`.
- After: `false` on both, before and after the switch-over. Its negation `≢` comes with it, as the prelude has both.
- The choice (fork E1): the two are written as top-level operators beside the library's `<->`, the library's own way for booleans. The specification and the prelude write them as methods of `Boolean`.

**L. Three walk departures at load and dispatch.**

- What it changes: walk's load check and its dispatch of generic methods.
- Two methods of one name with two and three parameters, `Two.tk(1, 2, 3)`: walk fails, 'Cannot find definition'; compiled, 3. After: 3 on both.
- `pt[\T extends Number\](a: T): (T, ZZ32)` beside `pt(a: Dot): (Dot, ZZ32)`, a valid pair: walk refuses it at load; compiled runs it. After: walk runs it.
- `trait T comprises { NaturalNumeral[\1, 10, 3\] } end`, a numeral type where the language allows none: walk runs it; the checker refuses it. After: walk refuses it too.

**M. Two compiled crashes where walk runs.**

- What it changes: the code generator.
- `c.t := High`, assigning a value of a narrower type to an object's `var` field from outside: compiled, it links and dies with 'NoSuchMethodError'. After: it runs.
- `num(R)`, a method declared in a trait and defined in an object that the trait lists: the same crash today. After: it runs. The one library met this once, at `denominator` of a fraction.

### The merge

- In run 1, each rung edits files of its own: R the parser's node maker, W two walk files, S the compiled dispatch, O the code generator's method list and the checker, A the transaction code of both paths. Where two could meet, in walk's evaluator or the code generator, each keeps to its own methods (section 4).
- In run 2, likewise: E the library, L three walk files, M the code generator.

### The measures

- **The checker count and the distance** stay 0 and 0. Rungs R, O and E run them, since the checker reads what they change.
- **microGPT:** no line changes. Its quick checks under walk stay 7 of 7 for both programs. Rung W makes its top-level constants run once; rung E's operator was tried with the quick checks beside it, 7 of 7.
- **Rows closed:** run 1 closes 8 (960, 1, 1026, 573, 1038, 650, 653, 1039), run 2 closes 6 (184, 1057, 1058, 981, 1053, 815).
- **The skill:** 13 workaround passages go or are rewritten (section 6, the list for the skill writer).
- **Which suites each rung's fix touches:** R both walk's and the compiled ones; W, A and L walk's; S, O and M the compiled ones, O with the checker's; E the one library's. The gate runs them all.

### What the batch leaves out

- **The rest of the 98 fixes with no fork** stay for later batches. Among them: walk's other load-check departures (rows 779, 780, 787, 788, 539, 416), the compiled path's walls (array literals, object expressions, `spawn`), and the record's tools (a failed compile that leaves an empty jar, and the like). Row 1017 waits for a count of the calls it changes.
- **The 50 fixes that work on the road removes,** most of them with the switch-over, stay with that work.
- **The batch after this one** keeps the list from climb batch 34b's review: rows 994 and 1091, then `Arr` and `Dot` as run tests, then rows 1098 to 1103.

### The forks that wait for you

These fixes need your answer first. In the order they bear on coherence, one at a time when you are ready:

1. **Tuples of any length compared by `=`, `<` and `CMP`** (row 923): a rule of the language for every length, declarations in the library up to some length, or as now (pairs and triples). Review-queue item 401.
2. **How a program writes infinity** (rows 95, 863, 980): the specification's `∞`, a library constant, or both; whether a float division by zero gives infinity or NaN (row 863); whether a decimal numeral too large for `RR64` is an error (row 980, item 502). Items 557 and 502.
3. **The arms of a `typecase`** (rows 1064, 964, 963, 1081): is a bare name in a tuple arm a binder or a type (item 592; rows 964 and 963 follow its answer, item 462), and is an arm that the selector's type excludes an error (item 598). One rung can then answer them together.
4. **An exit that runs after its label block finished** (row 1041): caught as a library exception under walk, or ends the compiled program. Item 562.
5. **A size parameter of 2^31 or more used as a number** (row 962): refused, an overflow, or a `ZZ64`. Item 461.
6. **Walk's load check where a declaration writes no return type** (row 1044): refuse valid pairs too, or load invalid ones, until walk can type a body. Item 564.
7. **A generic pair over `Box` that the checker refuses and walk loads** (row 786). Item 9.
8. **A pair that walk refuses and the checker accepts through bounds and `comprises` clauses** (row 713). Appendix I's passages not yet revised.
9. **An object that reaches a generic trait's method along two paths** (row 1037). Item 559.
10. **The checker's refusal of a top-level function more specific than a functional method of its name** (row 894). Item 356.
11. **A `Maybe` as an `if` condition under walk** (row 746). A default that waits for your review (F-239).
12. **A parameter without a type in a method that implements an abstract one** (row 405). Items 551 and 552.
13. **The compiled choice among functions passed as arguments** ignores contravariance (row 851). No item.
14. **A generic object whose type parameter stayed open, called with a tuple** (row 663). Item 526.
15. **A member checked under a conditional extension, called where the condition fails** (row 773). Item 177.
16. **A `comprises` clause over a `where` variable: extenders it does not list, and a crash at a call** (rows 752, 756). No item.
17. **A numeral at a generic place converted at each evaluation** (row 957). Item 450.
18. **Library code that should reach a program's own `=`** (row 807). No item.
19. **A program's object that extends the library's writer trait** (row 928). Item 385.
20. **A program's own type named like a library type, such as `Index`**: may it reuse the name? No row yet, no item.
21. **Native bindings with a varargs parameter** (row 849). No item.
22. **The export check and the names of static parameters** (row 836). Item 605.

### Cost and time

The agents run on the regular tiers (`tier-mode.sh status` prints `regular`).

- **Run 1: about 4.5 million tokens written, 5.3 million with the reserve. The range is 3.9 to 6.2 million. About 4 hours, 4 hours and 45 minutes with the reserve.** Five rungs with their skeptics write about 3.3 million, the fixed roles about 1.2 million. The reserve is 0.8 million and 45 minutes: one ruling on a rung with its repair, one on the review with its repair, and a second gate.
- **Run 2: about 3.0 million, 3.6 million with the reserve. The range is 2.6 to 4.2 million. About 3 hours and 15 minutes, 4 hours with the reserve.** Three rungs with their skeptics about 1.95 million, the fixed roles about 1.05 million; the reserve 0.6 million and 45 minutes.
- The evidence, climb batch 34's two runs on the regular tiers (`reviews/batch-34-review.md` and `reviews/batch-34b-review.md`, section 6), each role priced from the last run on the same tier:
  - Run 1 of 34, each rung with its skeptic: F, a small walk rung with both suites and the stages, 0.49 million; T 0.64; L 0.66; P 0.76; G, the checker with the stages and its timing, 0.77. Its fixed roles wrote 1.19 million: the gather 420 thousand, the review 426 thousand, the gate 146 thousand, the commit stage 130 thousand, the disk check 64 thousand. Run 2 of 34, one rung: the gather 377 thousand, the review 308 thousand, the gate 149 thousand, the commit stage 126 thousand.
  - So R is priced at 0.5 million and W at 0.55, as F; S at 0.6, as T; A at 0.8, two paths' transactions at one and four threads and the atomic runs, a little above P; O at 0.85, G's checker work and a second wall in the code generator. In run 2, E at 0.5, as F; L at 0.7, three walk fixes; M at 0.75, two code-generator fixes, one at a site not yet found. Run 2's fixed roles: a gather of three rungs about 0.4 million, the review 0.35, the gate 0.15, the commit 0.13, the disk 0.065.
  - The reserve: run 1 of 34 spent 0.16 million of its 0.8; run 2 none of its 0.6.
  - The minutes: run 1 of 34's workers took 34 to 58 minutes and its skeptics 13 to 32; its rung stage 2 hours 57 for five rungs, a machine restart among them; the gather 55 minutes; the review 21 beside the gate's 29; the commit stage 3½. Run 2 of 34: the gather 41, the review 12 beside the gate's 30.
  - A restart of the machine is left outside the estimate; run 1 of 34's cost about 0.43 million.
- **The disk.** The script stops a run under 1.5 GiB a rung plus 4 GiB. Run 1 needs 11.5 GiB, run 2 8.5 GiB. Free on 23 November before the planner's probe: 11.99 GiB (`df -P /home/user`, 12,573,244 blocks of 1,024 bytes available), so run 1's margin is about half a gigabyte. If the free space is under 11.5 GiB at the launch, free disk by the `cloud-container` skill, or move rung A to run 2, which then holds four rungs, 10 GiB.

### Your review list from this record

- The forks of section 3, each at its default. By my reading none is consequential by the rule.
- Six review-queue items whose "other way" the batch builds, settled by P-180 and your go: item 558 (rows 573 and 1038), 561 (row 1039), 540's first point (row 1026), 576 (row 1053), 585 (rows 1057 and 1058), and 503 for its `comprises` clause (row 981). Item 503's three other forms, a numeral type as a variable's, a field's or a return type, stay as they are.
- Item 44 of the old queue, closed as learning, asked whether the code generator should accept `override`: rung O does, by the traits chapter's rule and item 73's default, "strict".
- Rows 964, 963 and 1044, which the inventory counted as fixes with no fork, move to the forks that wait for you (items 3 and 6 above).
- Two ledger notes by the planner: row 960 reproduces on the compiled path too; row 650's second wall.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

None, by the planner's reading. What the record settles, and so is no fork:

- **That these defects are fixed now:** P-180, with its history of 2026-11-23 ("Don't just document and swipe [sweep] issues under carpet in the gap ledger"), and the go of 08:4x UTC. It settles review-queue items 558, 561, 540 (point 1), 576, 585 and 503 (its `comprises` form), each of whose defaults was "no rung planned" or "as landed until walk runs the checker".
- **What `override` means:** the traits chapter's rule (`Specification/basic/traits.tex:673-683`), as walk and the checker read it (F-88), with item 73's default, "strict": an `override` at an inherited declaration's own parameter types overrides nothing.
- **What an exit out of an atomic block keeps:** `Specification/basic/expressions/atomic.tex:59-63`, "writes within the block are retained".
- **That `EQV` belongs to `Boolean`:** the specification's `Boolean` (`Specification/basic-lib/booleans.tex:252-263`) and the compiler's prelude (`CompilerBuiltin.fsi:465-466`) agree; the one library is silent, not contrary. P-37 keeps the prelude unchanged.
- **The digit count:** P-174, `n` the count of the numeral's digits; review-queue item 473 (`Literal[\v\]`) is a separate question, untouched.
- **What stays the curator's:** each fork of section 2, "The forks that wait for you"; rows 1041 (item 562), 694 and 594 stay open beside rungs A, O and S.

Two effects that come near microGPT, neither consequential by the rule: fork W2 makes the model's top-level constants run once under walk, at load, with the same values and no line changed; fork E1 adds an operator that no component of the model declares or uses, and the quick pair passed with it (PRB section 4).

### Forks the batch takes

Each fork below builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone.

1. **B1. One record, two runs.** Run 1 is R, W, S, O and A; run 2 is E, L and M on run 1's landed tree. **Default: so.** The reason: the disk floor, 1.5 GiB a rung and 4 GiB, against about 12.0 GiB free; no rung of run 2 needs run 1. Way not taken: one run of eight rungs, 16 GiB.
2. **B2. What the batch takes.** The fixes of section 1, chosen from the inventory's group (a) where the two paths differ or depart from the specification, a program meets the defect, and the fix is small. **Default: so.** Rows 964, 963 and 1044 move to the forks that wait (section 2): each needs an answer first (PRB section 5). Row 1017 stays in group (a) for a later batch: its fix reaches every numeral at a generic declaration, and needs a count first. A program that writes any of these meets today's behaviour.
3. **R1. The node of a numeral with a radix point keeps its digits as written, apostrophes and narrow no-break spaces removed, its leading zeros among them;** `NumeralNumbers.of` counts them; the value is unchanged. **Default: so.** A message that quotes the numeral's text then shows it as written, `00.5`. Way not taken: a separate count kept beside a trimmed text.
4. **W1. A subscript that follows a primary's front evaluates all its indices,** as `forSubscriptExpr` does. **Default: so.**
5. **W2. Each name of a top-level tuple binding reads its element from the temporary,** so the right side runs once. **Default: so.**
6. **S1. An object's dispatch method tests and casts each argument at its own local, whatever the position of `self`.** **Default: so.**
7. **O1. The code generator compiles the modifier `override`, and an object's class holds a method for the override and none for the declarations that it overrides, by the checker's own table of what it keeps from being inherited** (`STypesUtil.providedAndOverridden`), not by a second reading of the rule. **Default: so.** Way not taken: the modifier compiled with the overridden declarations kept in the dispatch, so that `f(B, 17)` runs `A`'s `f`, where walk runs `B`'s.
8. **O2. The checker refuses an `override` that overrides nothing, in the cases where walk refuses it at load, with walk's words "does not override any inherited declaration".** **Default: so.** Row 694, the checker's choice for numerals at a dotted call, stays open.
9. **A1. An exit out of an atomic block commits the block's transaction, then leaves; a failed commit runs the block again, as at a normal end; an exception other than an exit discards the writes as today.** A nested block's commit hands its writes to the outer transaction, as at a normal end. **Default: so.**
10. **E1. The one library declares `opr EQV(a: Boolean, b: Boolean): Boolean` and its negation `NEQV` (the operators ≡ and ≢) as top-level operators beside `<->`, in its own form for the boolean operators;** the specification and the prelude write them as methods of `Boolean`. **Default: so.** A program that applies `EQV` to two objects of its own then gets a dispatch error, 'Unification error ...', in place of the internal error.
11. **L1. Walk's dotted call of a generic method chooses among the overloads that fit the call's number of arguments.** **Default: so.**
12. **L2. Walk's reading at object arguments compares a tuple result element by element,** as tuple types are covariant. **Default: so.**
13. **L3. Walk's load check refuses a numeral type in a `comprises` clause, with the message that it gives in an `extends` clause.** The three other written forms of item 503 stay as they are. **Default: so.**
14. **M1. An assignment to an object's `var` field from outside calls the setter at the field's declared type, the value cast to it where the cast is needed** (`castToTypeBelow`). **Default: so.**
15. **M2. A call of a functional method of an object that a `comprises` clause lists names a method that the component's class holds,** the overload method written or the call made through the trait. **Default: so.**

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation is of `main`'s code, `295c215c2c`. The record's forks are section 3's. The planner's probe programs are in `explorations/compile-ladder/plan-35/probes/programs/`, its notes in `fixes-35.md` beside them (PRB); a test is written new in the test folders, and no file is moved from there. Run 2's sections are read again on run 1's landed tree before its launch.

### R. A numeral with a radix point keeps its leading zeros in its digit count, on both paths (row 960)

**The mission.** `ExprFactory.makeFloatLiteralExpr` deletes every leading zero but one from the text that it keeps in the node (`nodes_util/ExprFactory.java:1640-1643`, the team's lines), and both paths count that text's digits for a numeral's number `n` (`nodes_util/NumeralNumbers.java:71-100`, `of(FloatLiteralExpr)`). So a program's coercion over `RadixPointNumeral[\n, m, r, v\]` reads `n` = 2 for `00.5`, where P-174 makes `n` the count of the numeral's digits, 3. `makeIntLiteralExpr` trims none: `007` has 3. You make the node keep the digits as written, so that both paths count them.

**The decisions this rung builds.** P-174. Section 3's fork R1.

**What you build, in order.**
1. **The tests first.** Promote `tests/XXXRadixPointLeadingZerosWalk.fss` to `RadixPointLeadingZerosWalk.fss` (`tests-writing.md`, "Promoting an XXX test"). Write its compiled twin, `compiler_tests/RadixPointLeadingZerosCompiled` with its link test, from `plan-35/probes/programs/compiler_tests/P35RadixPointLeadingZerosCompiled.fss`, its prefix dropped: a `value object Digits` whose coercion answers `bigToZZ64(n).asZZ32`, as `FloatLiteralValuePrint.fss` binds the helper. Seen failing on the base: under walk through `harness-one.sh`, 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits'; compiled through `junit.sh`, the link 'OK' and the run 'FAIL:  2 =/= 3; literals.tex, section "Literals": 00.5 has three digits' (PRB sections 1 and 2).
2. **The fix** in `makeFloatLiteralExpr` (fork R1). Both tests pass. Then read each other reader of the node's text (`git grep -n 'getText' -- '*.java' '*.scala'` near `FloatLiteralExpr`: `CoercionOracle`, `IntegerLiteralFoldingVisitor`, `NumeralFoldJUTest`), and say what each now sees. The planner's grep of the library, the test folders, the demos and microGPT found no other numeral with a radix point and two or more leading zeros (`grep -rn -E '(^|[^0-9.A-Za-z_"])00+\.[0-9]'`).
3. **The whole suites once,** `ant testSystem` and `ant testQuick`: the node is made by the parser, which both paths run (`tests-running.md`, "When to run a whole suite").
4. **The stages** once on your final tree.

**The stages.** Both, once.

**Rows.** Close 960.

**Specification.** `grep -rn '~960' Specification --include=*.tex` prints one line on the base, in Appendix I's entry "The numeral types, their conversion and their default", whose effect names the departure: `Specification/appendices/changes.tex:5485-5488`, "a numeral with a radix point keeps only one of its leading zeros in its digit count, as the parser gives the numeral to both implementations (row~960);". Take that clause out of the effect, keeping the sentence's other clauses whole, and list it before and after. Change no sentence of `literals.tex`: review-queue item 473, on `Literal`, is another question.

**Files.** `nodes_util/ExprFactory.java` (`makeFloatLiteralExpr`); `Specification/appendices/changes.tex:5485-5488`; your tests. Not: the parser grammars; microGPT.

**Reserved points.** A model line: none. A pinned message or a test's checked value that changes.

**Overlaps by file.** None.

### W. Walk's subscript before a superscript, and its top-level tuple binding run once (rows 1 and 1026)

**The mission.** Two forms that the compiled path runs as the specification says, and walk does not.
- Row 1. In a primary whose math items are a subscript and then a superscript, as `m[3,7]^2` or `x[5]^2`, walk applies the subscript through `evalAndInvokeMethod`, whose `evalInvocationArgs` drops the first element of its list (`interpreter/evaluator/Evaluator.java:1167-1189`, `mathItemApplication`; `:1386-1397`): right for a juxtaposition's list, wrong for a subscript's indices. So `m[3,7]^2` is `(m[7])^2`, 11449 for 1075369, and `x[5]^2` stops, 'Failed to find any matching overload, args = ()' (PRB section 1). The compiled path is right (F-387; PRB section 2, `P35SubscriptThenSuperscriptCompiled` passes on the base). `forSubscriptExpr` evaluates all its indices (`:1034-1045`), the precedent.
- Row 1026. `DesugarerVisitor.forVarDecl` binds a temporary to a top-level tuple binding's right side, then initializes each name from a field reference on the right side itself, not on the temporary (`interpreter/rewrite/DesugarerVisitor.java:865-875`). So the right side runs once for each name and once more. The compiled path runs it once (F-369).

**The decisions this rung builds.** None names the mechanism. Section 3's forks W1 and W2.

**What you build, in order.**
1. **The tests first.** Row 1 has no test: write `tests/SubscriptThenSuperscriptWalk.fss` from `plan-35/probes/programs/tests/SubscriptThenSuperscriptWalk.fss`, which asserts two indices, one index and an array element, `x[5]^2` for `x: ZZ32[7]`; add the form after a dotted call, `B.f()[5]^2` (row 1's notes). Promote `tests/XXXTopLevelTupleBindingOnceWalk.fss`. Seen failing on the base through `harness-one.sh`: 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript', and 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once' (PRB section 1).
2. **The subscript** (fork W1). The first test passes.
3. **The tuple binding** (fork W2). The second test passes. Then rewrite row 152's notes, which say of an earlier model program's `loadCorpus` binding that its corpus "loads once", in line with the fix, with `ledger.py rewrite`.
4. **The whole suite once,** `ant testSystem`.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1 and 1026; row 152's notes as step 3 gives.

**Specification.** `grep -rn 'row~1[^0-9]' Specification --include=*.tex` and `grep -rn '~1026' Specification --include=*.tex` print nothing on the base. List any sentence that your change makes false, or none.

**Files.** `interpreter/evaluator/Evaluator.java` (`mathItemApplication`, and `evalInvocationArgs` only if its other callers keep their behaviour); `interpreter/rewrite/DesugarerVisitor.java` (`forVarDecl`); your tests; row 152. Not: the compiled path; microGPT.

**Reserved points.** A model line: none. An interpreter output that changed. microGPT's two programs bind their constants by top-level tuple bindings of literal tuples (`explorations/run-c4/src/MicroGptFlat.fss:17-19`, `explorations/apl/mg/MicroGptApl.fss:26-28`), whose right sides now run once, with the same values.

**Overlaps by file.** `Evaluator.java` with rung A, if A edits `forAtomicExpr`: you keep to `mathItemApplication` and the helpers it calls.

### S. The dispatch method of an object's functional method whose self is not first tests the arguments, not the receiver, on the compiled path (rows 573 and 1038)

**The mission.** Where an object overloads a functional method that it inherits, by declarations of its own whose `self` is not the first parameter, its class's dispatch method loads the receiver, `aload_0`, for its type test and cast at the position of an argument that is `aload_1` or later (row 573's notes; `compiler/OverloadSet.java:2420`, `ForTraitOrObject`, its `selfIndex` and `firstArg`, and the type tests that `generateCall` emits for each parameter but self's, `:1489`). So a call dies with `ClassCastException` (row 573), or, where the receiver itself has the own declaration's parameter type, runs the object's declaration for every argument, with no error (row 1038; F-372). Walk runs each call by its arguments' run-time types. With `self` first, both paths agree. You make each test read its argument at its own place.

**The decisions this rung builds.** None names the mechanism. Section 3's fork S1.

**What you build, in order.**
1. **The tests first.** Promote the three expected failures, each a run test whose link test is already plain: `compiler_tests/XXXFunctionalMethodOverloadSelfLast` (self last), `XXXFunctionalMethodCoverSelfSecond` (self second, a cover through `comprises` clauses) and `XXXFunctionalMethodSelfSecondReceiverTested` (row 1038's). Seen failing on the base, as plain copies through `junit.sh`: 'ClassCastException: class ...$C cannot be cast to class ...$N1'; '...$Pq cannot be cast to class ...$Ka'; 'FAIL:  3 =/= 1; mark(1, Pq): only the inherited declaration applies, though the receiver is a K' (PRB section 2).
2. **The dispatch method** (fork S1). The three pass.
3. **Your own tests and the compiler track's tests of functional methods,** in one JVM: `git ls-files 'ProjectFortress/compiler_tests/*FunctionalMethod*.test'`. Leave the whole tracks to the gate.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 573 and 1038. Row 594, a generic functional method with `self` not first that dies with `NoSuchMethodError`, is a sibling at another site: run its test, `compiler_tests/XXXGenericFunctionalMethodSelfSecond`, once after your fix and report whether it still fails; do not repair it here.

**Specification.** `grep -rn '~573\|~1038' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `compiler/OverloadSet.java`: the dispatch method of a trait's or object's overload set, its type tests and casts (`ForTraitOrObject`, and what `generateCall` emits for it); your tests. Not: the checker; walk; microGPT.

**Reserved points.** A model line: none.

**Overlaps by file.** None expected: rung O keeps out of `OverloadSet.java`.

### O. The modifier override on the compiled path: the code generator compiles it, and the checker refuses one that overrides nothing (rows 650 and 653)

**The mission.** By the traits chapter, a method declaration may have the modifier `override`, which overrides each inherited declaration whose parameter types are strictly narrower than its own, and an `override` that overrides nothing is a static error (`Specification/basic/traits.tex:673-683`; the skill's `revival-changes.md`, "Traits and objects"). Walk builds both: it runs the team's `tests/disp0.fss`, and refuses an `override` that overrides nothing at load, 'has the modifier override and does not override any inherited declaration' (`interpreter/evaluator/values/Constructor.java:699`; `tests/OverrideNothingWalk.fss` and its siblings `OverrideNothing*Walk.fss`, `OverrideEqualTypesWalk.fss`, `OverrideGenericInstanceEqualTypesWalk.fss`). The compiled path builds neither:
- the code generator refuses every declaration with the modifier, 'Don't know how to compile this kind of FnDecl' (`compiler/codegen/CodeGen.java:3381-3383`, `fnDeclCompilableModifiers`; `forFnDecl`, `:3455-3459`), row 650;
- with the modifier let through, the object's class fails to load, 'ClassFormatError: Duplicate method name "f?0"': the class gets the override and a second method of the same name for the pair with the declaration that the override hides (PRB section 3). The checker reads that hiding (`scala_src/useful/STypesUtil.scala:1698`, `providedAndOverridden`; F-88); the code generator gathers an object's inherited methods through `STypesUtil`'s other tables (`CodeGen.java:1096`, `allMethodsNotReplaced`; `:1287`, `properlyInheritedMethodsNotIdenticallyCovered`);
- the checker accepts an `override` that overrides nothing (row 653): a `typecheck` of walk's `OverrideNothingWalk` program passes.

You compile the modifier, the class holding what the checker reads as provided, and make the checker refuse an `override` that overrides nothing.

**The decisions this rung builds.** P-148 for the checker's timing. Review-queue item 73's default, "strict": an `override` at an inherited declaration's own parameter types overrides nothing. Section 3's forks O1 and O2.

**What you build, in order.**
1. **The tests first.** Promote `compiler_tests/XXXOverrideModifierCodeGeneration` to a run test with its link test, checking both of its lines, `f PASS` and `g PASS`. Seen failing on the base through `junit.sh`: 'CompilerError: ... Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String' (PRB section 2). Write a compiled `typecheck` test of row 653 from walk's `tests/OverrideNothingWalk.fss`, `typecheck_err_contains=does not override any inherited declaration`: seen failing on the base, 'Must satisfy typecheck_err_contains' (PRB section 2, `P35OverrideNothingCompiled`, whose key was the bare word `override`).
2. **The code generator** (fork O1). The first test passes, with the verifier on.
3. **The checker** (fork O2). The second test passes. Then what the checker now refuses elsewhere: `ant testQuick`, and the two stages. The library has no `override` (`grep -n '^\s*override ' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss` prints nothing on the base).
4. **The stages** once on your final tree, and the checker's timing before and after (P-148).

**The stages.** Both, once.

**Rows.** Close 650 and 653. Row 694 stays open: run its form, `B.f(3, 4)` with `B`'s `override f(x: Number, y: NN32)` over `A`'s `f(x: NN32, y: NN32)`, once after your fix, and report what the checker says.

**Specification.** `grep -rn '~650\|~653' Specification --include=*.tex` prints one line on the base, in Appendix I's entry "The features not yet supported, in the preface and the introduction": `Specification/appendices/changes.tex:6422-6423`, "The code generator refuses the modifier \KWD{override} (row~650); nothing checks \KWD{io}, and nothing reads \KWD{atomic} on a function." Take the clause on `override` out, keeping the rest, and list it before and after. The team's draft note `Specification/basic/traits.tex:15-16`, "the \KWD{override} modifier ... not yet supported", becomes false: list it, and change no team note.

**Files.** `compiler/codegen/CodeGen.java` (`fnDeclCompilableModifiers`, `forFnDecl`, and the gathering of an object's inherited methods at `:1096-1158` and `:1287`); `scala_src/useful/STypesUtil.scala`, or the checker's file where an object's provided methods are checked (`scala_src/typechecker/OverloadingChecker.scala`); `Specification/appendices/changes.tex:6422-6423`; your tests. Not: `compiler/OverloadSet.java` (rung S); walk; microGPT.

**Reserved points.** A model line: none. A team test's checked value changed. A line of the libraries changed.

**Overlaps by file.** `CodeGen.java` with rung A, only if A edits `forAtomicBlock`: you keep to the members named.

### A. An exit out of an atomic block keeps the block's writes, on both paths (row 1039)

**The mission.** The specification: "If it completes abruptly by exiting to an enclosing \KWD{label} expression, writes within the block are retained and become visible to other threads." (`Specification/basic/expressions/atomic.tex:59-63`). Both paths discard them. Compiled, the block's handler takes every abrupt completion, and `BaseTask.leaveTransaction` ends the transaction without a commit for anything that is not an abort (`runtimeSystem/BaseTask.java:293-314`); the exit is a `LabelExit` thrown through it (F-373). Walk runs an atomic block in `FortressTaskRunner.doItOnce`, which commits only after a normal end and gives the transaction up in its `finally` (`interpreter/evaluator/tasks/FortressTaskRunner.java:121-138`, called from `Evaluator.forAtomicExpr`, `interpreter/evaluator/Evaluator.java:184-203`); walk's exit is a `LabelException` (`exceptions/LabelException.java`). An uncaught exception discards the block's writes, as the same paragraph says, and stays so. You make an exit commit the block's transaction, on both paths.

**The decisions this rung builds.** None names the mechanism. Section 3's fork A1.

**What you build, in order.**
1. **The tests first.** Promote `tests/XXXExitOutOfAtomicWalk.fss` and the compiled run test `compiler_tests/XXXExitOutOfAtomicCompiled` (its link test, `ExitOutOfAtomicCompiledLink.test`, takes the new name). Add to each a case where the exit leaves a nested atomic block and the outer one, and assert the writes of both. Seen failing on the base: under walk, 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained'; compiled, 'FAIL:  0 =/= 7; atomic.tex, section "Atomic Expressions": writes within a block that an exit leaves are retained' (PRB sections 1 and 2).
2. **The compiled path** (fork A1). The compiled test passes.
3. **Walk** (fork A1). The walk test passes.
4. **One thread and four** (`tests-writing.md`, "Names, comments, citations"): each test at `FORTRESS_THREADS=1` by a direct run, and through the harness at four. Then the four-thread atomic runs (`gate.md`, "The atomic runs"), since the change is in transactions (`compiler.md`, "Testing an edit here").
5. **The whole suite once,** `ant testSystem`.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1039. Row 1041, an exit that runs after its label block has completed, is the curator's question (review-queue item 562): leave its behaviour as it is on both paths, and run its tests once after your fix.

**Specification.** `grep -rn '~1039' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `runtimeSystem/BaseTask.java` (`leaveTransaction`), or the code generator's atomic block (`CodeGen.forAtomicBlock`) if the commit belongs there; `interpreter/evaluator/tasks/FortressTaskRunner.java` (`doItOnce`), or `Evaluator.forAtomicExpr`; your tests. Not: the read and write tracking of `Transaction.java` and walk's `transactions/`, beyond a call to their commit; microGPT.

**Reserved points.** A model line: none. An atomic run that fails.

**Overlaps by file.** `Evaluator.java` with rung W, `CodeGen.java` with rung O: each keeps to its own members.

### E. The logical equivalence of two booleans in the one library (row 184)

**The mission.** The specification's `Boolean` has the operator IDENTICAL TO (U+2261), written `EQV` in ASCII: "returns true if both arguments are true or both arguments are false" (`Specification/basic-lib/booleans.tex:252-263`, under the trait `Fortress.Core.Boolean`). The compiler's prelude declares it and its negation, `opr EQV(self, other:Boolean)` and `opr NEQV` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:465-466`), and a compiled `t EQV t` runs against it (PRB section 2). The one library declares neither; its boolean operators are top-level functions, the nearest `opr <->(a: Boolean, b:Boolean):Boolean = a=b` (`Library/FortressLibrary.fsi:2792`, `.fss:4922`). So walk stops on `t EQV f` with an internal error, '** bug! Expect all oprefs to be top level EQV' (`interpreter/evaluator/Evaluator.java:893-909`, `getOp`), row 184, and at the switch-over the compiled path would lose the operator. You declare the two operators over two booleans in the one library.

**The decisions this rung builds.** P-37: the prelude gains no declaration. Section 3's fork E1.

**What you build, in order.**
1. **The tests first.** `tests/BooleanEquivalenceWalk.fss`, from `plan-35/probes/programs/tests/BooleanEquivalenceWalk.fss`, with cases for `NEQV`. Seen failing on the base through `harness-one.sh`: 'InterpreterBug: ... ** bug! Expect all oprefs to be top level EQV' (PRB section 1). A compile test in `one_library_tests/` that the checker accepts `t EQV f` and `t NEQV f` for two booleans; see it fail on the base before the library's edit. A run test there would meet rows 994 and 1098 (`=` and `println` of booleans), so write none.
2. **The library** (fork E1), beside `<->` in `FortressLibrary.fsi` and `.fss`. The tests pass. Run row 184's own program once, `a EQV b` for two objects of a program's `object Pt(x: ZZ32)`: with the planner's trial it stopped with 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt' (PRB section 4). Report what it gives.
3. **`ant testOneLibrary`** (`library.md`, "Designing a change"), and **the stages** once on your final tree.

**The stages.** Both, once.

**Rows.** Rewrite row 184 first with `ledger.py rewrite`: its specification cell reads "silent" where `booleans.tex:252-263` declares the operator, and its notes do not name the prelude's declaration. Then close it.

**Specification.** `grep -rn '~184' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `Library/FortressLibrary.fsi` and `Library/FortressLibrary.fss`, beside `opr <->`; your tests; row 184. Not: the prelude (P-37); walk's Java; microGPT.

**Reserved points.** A model line: none. microGPT's components declare no `EQV`, and the quick pair passed 7 of 7 with the planner's trial (PRB section 4). The APL experiments' `explorations/apl/base/AplCore.fss:207-224` declares seven of its own, which join the library's in one overload set; no gated program imports it.

**Overlaps by file.** None.

### L. Three of walk's departures at generic and numeral declarations: dotted methods of two arities, a tuple result, and a numeral type in a comprises clause (rows 1057, 1058 and 981)

**The mission.** Three places where walk departs and the compiled path is right.
- Row 1057. Two generic dotted methods of one name and one static parameter that differ in their number of parameters, `tk[\U\](y: U, z: U)` beside `tk[\U\](y: U, z: U, w: U)` in `object Two`, load, and a call fails, 'Cannot find definition for method tk given receiver Two' (`interpreter/evaluator/values/DottedMethodApplication.java:106`). The compiled path runs both.
- Row 1058. Walk refuses at load a valid pair, `pt[\T extends Number\](a: T): (T, ZZ32)` beside `pt(a: Dot): (Dot, ZZ32)` with `object Dot extends Number`, 'fails the Return Type Rule': its reading at object arguments takes a returned type parameter only (`interpreter/evaluator/values/OverloadedFunction.java:882-904`, `returnRuleAtObjectArguments`), where tuple types are covariant (`Specification/basic/types-vals-vars.tex`, "Tuple Types"). The compiled path compiles and runs the pair.
- Row 981. A numeral type in a `comprises` clause loads and runs, as `trait T comprises { NaturalNumeral[\1, 10, 3\] } end`, where P-174 writes a numeral type only as a parameter's type. Walk's check refuses one in an `extends` clause or as a static argument (`interpreter/evaluator/BuildEnvironments.java:1210-1228`, `checkNumeralTypesWritten`), and the checker refuses all three: 'NaturalNumeral cannot be written in a program except as a parameter's type.'

**The decisions this rung builds.** P-174 for row 981. Section 3's forks L1, L2 and L3.

**What you build, in order.**
1. **The tests first.** Promote `tests/XXXGenericMethodOverloadArity.fss`, `tests/XXXGenericBesidePlainTupleReturnWalk.fss`, and `tests/XXXNumeralTypeComprisedWalk.fss` with its `.test`. Seen failing on the base, as plain copies through `harness-one.sh`: 'Cannot find definition for method tk given receiver Two'; refused at load, 'Overloading of pt(a:Dot):(Dot, FortressLibrary.ZZ32) ... and pt[\T extends FortressLibrary.Number\](a:T):(T, FortressLibrary.ZZ32) ...'; and 'REACHED: a numeral type is in a comprises clause', then 'Missing expected refusal at load' (PRB section 1).
2. **Row 1057** (fork L1), **row 1058** (fork L2), **row 981** (fork L3), each test passing after its fix. After each, run one program that loads the library, since walk's load check reads every program's library (`interpreter.md`, "What walk checks").
3. **The whole suite once,** `ant testSystem`.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1057, 1058 and 981.

**Specification.** `grep -rn '~1057\|~1058\|~981' Specification --include=*.tex` prints one line on the base, in Appendix I's entry "The numeral types, their conversion and their default": `Specification/appendices/changes.tex:5488-5489`, "the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981);". Take that clause out, keeping the sentence's other clauses whole, and list it before and after.

**Files.** `interpreter/evaluator/values/DottedMethodApplication.java`, or where walk builds a generic dotted method's overloads; `interpreter/evaluator/values/OverloadedFunction.java` (`returnRuleAtObjectArguments`); `interpreter/evaluator/BuildEnvironments.java` (`checkNumeralTypesWritten`); `Specification/appendices/changes.tex:5488-5489`; your tests. Not: the compiled path; the library; microGPT.

**Reserved points.** A model line: none. A line of the library or a team test that walk now refuses at load.

**Overlaps by file.** None.

### M. Two compiled calls that the checker accepts and that die at run time: a var field assigned a narrower value, and a functional method of a comprised object (rows 1053 and 815)

**The mission.** Two compiled calls link clean and die with `NoSuchMethodError`, where walk runs them.
- Row 1053. `c.t := High`, for `object Cell(var t: T)` and `object High extends T`, dies with 'NoSuchMethodError: ... FVoid ...$Cell.t(...$High)': the setter's call names the value's static type, not the field's. The same for `c.r := self` at a listed type, in `trait Q comprises { R }` beside `object Cell(var r: R)`: '...$Cell.r(...$Q)'; once the call names the field's type, that value needs the cast of `CodeGen.castToTypeBelow` (`compiler/codegen/CodeGen.java:8117`; F-377).
- Row 815. `num(R)`, for `abstract num(self): ZZ32` in `trait Q comprises { R }` and `num(self): ZZ32 = 1` in `object R extends Q`, dies with 'NoSuchMethodError: ... FZZ32 ....\=num{...}': the call names the pair's overload method, which the component's class does not hold. Through a value typed as the trait, the call runs. The one library's `QQ` and `Ratio` met the same at `denominator` (the row's notes; `compile-ladder/rung-export-align/REPORT.md`, section 8).

You make each call name a method that the class holds.

**The decisions this rung builds.** None names the mechanism. Section 3's forks M1 and M2.

**What you build, in order.**
1. **The tests first.** Promote `compiler_tests/XXXVarFieldAssignedSubtypeRun` and `XXXFunctionalMethodComprisedObject`, each a run test whose link test is plain. Add to the first row 1053's second form, `c.r := self`. Seen failing on the base through `junit.sh`: 'NoSuchMethodError: ... FVoid P35VarFieldAssignedSubtypeRun$Cell.t(P35VarFieldAssignedSubtypeRun$High)' and 'NoSuchMethodError: ... FZZ32 P35FunctionalMethodComprisedObject.\=num{...}' (PRB section 2).
2. **Row 1053** (fork M1), then **row 815** (fork M2): find where the call is emitted, and where the component's class gets its overload methods. Each test passes, with the verifier on.
3. **Your own tests, and the compiler track's tests of fields and of functional methods,** in one JVM. Leave the whole tracks to the gate.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1053 and 815.

**Specification.** `grep -rn '~1053\|~815' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java` (`forAssignment` and the setter call it emits; the call of a functional method, and the component's overload methods), or `compiler/OverloadSet.java` where an overload method is written; your tests. Not: the checker; walk; microGPT.

**Reserved points.** A model line: none.

**Overlaps by file.** None in run 2.

### The rule the rungs keep, and how they meet

- **Run 1.** No file is expected in two rungs. Where one may reach another's file, each keeps to its members:
  - `interpreter/evaluator/Evaluator.java`: W in `mathItemApplication` (`:1167`) and the helpers it calls; A only in `forAtomicExpr` (`:184`).
  - `compiler/codegen/CodeGen.java`: O in `fnDeclCompilableModifiers`, `forFnDecl` (`:3381-3521`) and the gathering of inherited methods (`:1096-1158`, `:1287`); A only in `forAtomicBlock` (`:2067`).
  - `compiler/OverloadSet.java`: S only.
  - `Specification/appendices/changes.tex`: R at `:5485-5488`, O at `:6422-6423`, two entries.
  - The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order").
  - If a rung's cause lies in a member that another names, it reports it and builds its repair outside it.
- **Run 2.** E, L and M share no file. Their sections are read again on run 1's landed tree before the launch.
- **They meet on the merged tree:** the suites, the atomic runs and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, piece by piece, with its home here.

- **Row 960, which the curator named:** rung R.
- **The low-hanging fruit of the inventory's group (a), by coherence, then by cost:** rungs W, S, O and A in run 1; E, L and M in run 2.
- **The checks of each fix first:** `plan-35/probes/fixes-35.md`, sections 1 to 4; the three that moved to group (b), section 5.
- **The skill passages that go:** section 6, "For the skill writer".
- **Group (b), in order:** section 2, "The forks that wait for you".
- **The list for the batch after:** section 2, "What the batch leaves out", unchanged from climb batch 34b's review.

### The planner's probes

`compile-ladder/plan-35/probes/fixes-35.md` holds the runs with their commands and output: walk on the base (section 1), compiled on the base (section 2), the override modifier let through (section 3), the logical equivalence in the one library with microGPT's quick pair (section 4), what the checks moved (section 5), the disk (section 6), and the ledger (section 7). Its programs are in `programs/tests/` and `programs/compiler_tests/`.

**Not run:** a gate stage, a whole suite, a timing; the compiled form of rows 1058 and 1057 and walk's form of rows 573, 1038 and 650, which their rows state.

### Rows filed by plan

None new. Notes, with `ledger.py note`: row 960, the compiled reproduction; row 650, the second wall. Row 184's notes have 13 characters left, so its facts go to rung E, which rewrites the row. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

- Rows 964, 963 and 1044: section 2, "The forks that wait for you", items 3 and 6.
- Row 1017: group (a), a later batch, with a count of the calls whose choice changes.
- The rest of group (a): later batches. Walk's other load-check rows (779, 780, 787, 788, 539, 416, 697, 1049, 1044's sibling 785) are PLAN's walk rung on the load check (`PLAN.md:308-309`).
- Group (c): with its road. The batch after keeps climb batch 34b's list (`reviews/batch-34b-review.md`, Part 5).

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 34b: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-35/manifest/` is made from `compile-ladder/plan-34/manifest/` before the launch: `lists35.py` holds the briefings of section 1, `gen35.py --run 1|2` writes a run's block from the record, and `check35.js --run 1|2` checks the block in a scratch copy of the script and, with `--write`, splices it.

- run 1: `BATCH` `35`, the folder `compile-ladder/climb-batch-35/`, the rungs R, W, S, O, A in that order; run 2: `BATCH` `35b`, `compile-ladder/climb-batch-35b/`, the rungs E, L, M;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick, a backslash or a double quote;
- no rung declaring a count, a crash or a move;
- W, S, A, L and M `STAGE_BLIND`; R, O and E naming the two stages in a step of their sections;
- section 4's characters outside ASCII: none.

### What every agent reads first

**Run 1.** This run is climb batch 35, the first of the two runs of the record CLIMB-BATCH-35.md, a housekeeping batch: each rung fixes defects where walk and the compiled path behave differently or depart from the specification, each closing its ledger row, test first. Its rungs:

- R, a numeral with a radix point keeps its leading zeros in its digit count, on both paths;
- W, walk's subscript before a superscript, and its top-level tuple binding run once;
- S, the compiled dispatch method of a functional method whose self is not first;
- O, the modifier override compiled, and the checker's refusal of one that overrides nothing;
- A, an exit out of an atomic block keeps the block's writes, on both paths.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. W and A may both reach Evaluator.java, and O and A CodeGen.java: each keeps to its own members, as its section says. R and O run the count stage and the distance stage once; W, S and A run neither. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected R, W, S, O, A, and builds the specification once.

**Run 2.** This run is climb batch 35b, the second of the two runs of the record CLIMB-BATCH-35.md, after climb batch 35, which landed rungs R, W, S, O and A. Its rungs:

- E, the logical equivalence of two booleans in the one library;
- L, three of walk's departures at generic and numeral declarations;
- M, two compiled calls that the checker accepts and that die at run time.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. E runs the count stage and the distance stage once; L and M run neither. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected E, L, M, and builds the specification once.

### Before the launch

The coordinator, for run 1:

1. **The check of this record by a fresh reader on Fable,** its changes in place (`references/batch.md`, "The go"); the go was given in advance.
2. **The generator** for `--run 1`, its checks and the splice, as the manual's "Before the launch", step 4, gives them; the keys into this record and into the probe notes checked with `facts-extract.sh --check`. The base is `main`'s head after that commit.
3. **The base build.** `/home/user/fortress-base42` at `295c215c2c`, built and clean, serves while `main` moves only under `explorations/`, `docs/` and `.claude/` (`git diff --stat 295c215c2c <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing; it printed nothing on `414a1aef42`). The planner seeded its probe tree from it on 2026-11-23.
4. **The disk:** 11.5 G or more free (section 2, "Cost and time", for the fallback); `git status --porcelain` empty in the main tree.
5. **The launch from a turn that no message of the curator's started,** a check-in's turn.
6. **Check-ins** for about 4 hours and 45 minutes, 45 minutes apart; the check-in file `<scratchpad>/batch35/checkins.txt`.

For run 2, after run 1's landing: sections E, L and M and "The rule the rungs keep" read again against the landed tree; a base build at run 1's landing (`/home/user/fortress-base43`); the generator's block for `--run 2`, checked and spliced; then steps 4 to 6 with 8.5 G free and check-ins for about 4 hours.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 2>', baseBuild: '<the base build of step 3>'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte.

### The gate, and what it should show

The comparands for run 1 are climb batch 34b's, in `compile-ladder/climb-batch-34b/gate/`: 64 suites, 3,654 tests, `CompilerJUTest` 1,785, `OtherCompilerJUTest` 263, `LibraryJUTest` 86, `OneLibraryJUTest` 40, the system shards 879, `SpecDataJUTest` 130, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`, microGPT's quick pair 7 of 7 each.

- `testFast`: the compiler track gains R's compiled pair and O's `typecheck` test; S's three, O's one and A's one expected failures become plain tests.
- `testSystem`: W's new test; R's, W's and A's promotions.
- The atomic runs: unchanged, 24 programs, each three times `PASS`, after A's change.
- The ladder: no rung declares a move.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.
- For run 2 the comparands are run 1's gate. `testSystem` gains E's test and L's three promotions; `testFast` M's two promotions and E's one-library compile test.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 960 (R); 1 and 1026 (W), row 152's notes rewritten; 573 and 1038 (S); 650 and 653 (O); 1039 (A).
- **Run 2, closed:** 184, rewritten first (E); 1057, 1058 and 981 (L); 1053 and 815 (M).

### After the landing

- **PLAN:** the lines that name these rows as waiting: item 96 of "Pavol's answers" (rows 573 and 1038, `PLAN.md:149`); the batch 31 lists' lines on rows 1039 (`:844`), 1053 (`:865`); batch 31b's on rows 1057 and 1058 (`:878`); batch 32's on row 1026 (`:828`); batch 30's on row 981 (`:808`); the climb batch 11 list's question on `override` (`:428`); and phase 5's line on the code generator's gaps, for rows 573 and 815 (`:118`). "Next" and the lines of climb batches 35 and 35b.
- **The review queue:** this record's forks as new items; items 558, 561, 540 (point 1), 576, 585 and 503 (its `comprises` form) built; items 592 and 462 gain rows 964 and 963 as fixes that follow their answers; item 564 gains that the batch left row 1044 for its answer.
- **The post-batch review** of each run.

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After run 1, these are false or name a closed row as open:

- **F-363:** "`x[5]^2` or `B.f()[5]^2`, compiles (F-387) and fails under walk (row 1)" (W).
- **F-387:** "Walk still fails on these forms (row 1), so a program for both paths writes `(x[5])^2`" (W).
- **F-369:** "Under walk the same right side runs once for each name and once more (row 1026)" (W).
- **F-372:** "`mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573)" (S).
- **F-88:** "The code generator refuses `override` (row 650)" (O).
- **F-315:** "and the `override` modifier (row 650) are still refused" (O).
- **F-292:** "since under `Any` its override overrides nothing (row 653)": the test's reason stays, but the checker now refuses such an override (O).
- **F-373:** "an exit out of an `atomic` block loses the block's writes (row 1039)" (A).

After run 2:

- **F-257:** "rows 539, 779 and 1058 hold valid pairs that walk refuses" (L).
- **F-341:** "one in a `comprises` clause loads (row 981)" (L).
- **F-377:** the run-time failure of an assignment to a `var` field of a value of a strict subtype (row 1053) (M).

P-174, P-37 and P-180 stay true.

### For the skill writer: the passages of `fortress-repo` this batch makes false or needless

The batch writes no skill text. After each landing, the record-landing workflow's skill writer removes or rewrites these passages, each as on `main` at `f4b33d0fad`, with the inventory's entry (`compile-ladder/plan-35/probes/skill-workarounds.md`).

After run 1:

- `references/interpreter.md:26` (a1): the bullet "A numeral with a radix point keeps only one of its leading zeros ... (ledger row 960)". Goes (R).
- `references/tests-writing.md:34` (a39): "and `(x[5])^2`" and "and `x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)". Goes; `f(x)^T`'s refusal stays, the grammar's (F-363) (W).
- `references/interpreter.md:35` (a35): the bullet "The right side of a top-level tuple binding runs once for each name and once more ... (ledger row 1026). Bind the call to one name ...". Goes; the lead-in at `:33` stays for rows 1024 and 1025 (W).
- `references/compiler.md:157` (a77): the bullet "Where an object overloads an inherited functional method ... (ledger row 573) ... (ledger row 1038). Put `self` first in such overloads." Goes (S).
- `references/revival-changes.md:32` (a50, a63): "Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier, so a program that writes one does not compile (row 650)." Goes (O).
- `references/compiler.md:89` (a63): "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)." Rewritten: `override` compiles (O).
- `SKILL.md:126` (a41): "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block." Goes, or becomes the rule that an exit keeps the writes (A).

After run 2:

- `references/revival-changes.md:57` (a40): "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." Rewritten: the one library declares `≡` and `≢` over two booleans (E).
- `references/interpreter.md:84` (a17): the bullet on two generic dotted methods that differ in their number of parameters, "Give the two methods two names." Goes (L).
- `references/interpreter.md:82` (a14): the bullet on a valid pair whose generic result is a tuple that holds its type parameter (row 1058). Goes (L).
- `references/interpreter.md:30` (a26): the bullet "A numeral type written in a `comprises` clause loads and runs ... (ledger row 981)". Goes (L).
- `references/compiler.md:177` (a82): the bullet on an assignment from outside an object to its `var` field, "Bind the value at the field's type first". Goes (M).
- `references/compiler.md:175` (a81): the bullet on a call of a functional method of an object that a `comprises` clause lists, "Call it through a value typed as the trait". Goes; the lead-in at `:174` stays for row 839 at `:176` (M).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-34.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-34.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-35/probes/fixes-35.md), [their programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-35/probes/programs), [the inventory](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-35/probes/skill-workarounds.md), [climb batch 34's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-34-review.md), [climb batch 34b's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-34b-review.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Code: [ExprFactory.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java), [NumeralNumbers.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nodes_util/NumeralNumbers.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [DesugarerVisitor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java), [OverloadSet.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [STypesUtil.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala), [Constructor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java), [BaseTask.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java), [FortressTaskRunner.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks/FortressTaskRunner.java), [DottedMethodApplication.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [CompilerBuiltin.fsi](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi).
- Specification: [literals.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/literals.tex), [variables.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/variables.tex), [overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/overloading.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [atomic.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/atomic.tex), [label.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/label.tex), [booleans.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic-lib/booleans.tex), [advanced/overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/overloading.tex), [bindings.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/bindings.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
